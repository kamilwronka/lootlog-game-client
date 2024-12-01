import { useGlobalContext } from "@/contexts/global-context";
import { useCreateLoot } from "@/hooks/api/useCreateLoot";
import { useCreateTimer } from "@/hooks/api/useCreateTimer";
import { F } from "@/types/margonem/game-events/f";
import { GameEvent } from "@/types/margonem/game-events/game-event";
import { HeroD } from "@/types/margonem/hero";
import { checkIfAllowedNpc } from "@/utils/game/check-if-npc-is-monster";
import { checkIfNpcIsWithinRange } from "@/utils/game/check-if-npc-within-range";
import { getBattleParticipants } from "@/utils/game/get-battle-participants";
import { getLootCreator } from "@/utils/game/get-loot-creator";
import { getLoots } from "@/utils/game/get-loots";
import { useEffect, useRef, useState } from "react";

type Npc = {
  icon: string;
  id: number;
  tpl: number;
  x: number;
  y: number;
  nick: string;
  type: number;
  wt: number;
  actions: number;
  grp: number;
  lvl: number;
  originalId?: number;
  name?: string;
  resp_rand?: number;
  prof: string;
  hpp?: number;
  location?: string;
};

export const useGameEventsParser = () => {
  const { initialized } = useGlobalContext();
  const [gameEventsParserInitialized, setGameEventsParserInitialized] =
    useState(false);
  const pendingBattle = useRef<F | null>(null);
  const npcsMap = useRef(new Map<any, Npc>());
  const { mutate: createLoot } = useCreateLoot();
  const { mutate: createTimer } = useCreateTimer();

  const setupGameEventsHandler = () => {
    console.log("initializing game events handler");

    window.Engine.communication.ogSuccessData =
      window.Engine.communication.successData.bind(window.Engine.communication);

    window.Engine.communication.successData = (response) => {
      window.Engine.communication.ogSuccessData(response);
      const parsedEvent = JSON.parse(response);

      handleEvent(parsedEvent);
    };

    setGameEventsParserInitialized(true);
  };

  const removeGameEventsHandler = () => {
    console.log("deinitializating game events handler");

    window.Engine.communication.successData =
      window.Engine.communication.ogSuccessData;
  };

  const handleEvent = (event: GameEvent) => {
    const keys = Object.keys(event);

    if (keys.length <= 2) return;

    if (event.npcs) {
      event.npcs.forEach((npc) => {
        const template = window.Engine.npcTplManager.getNpcTpl(npc.tpl);
        if (!template) return;

        const isAllowedNpc = checkIfAllowedNpc(template);
        if (!isAllowedNpc) return;
        if (npcsMap.current.has(npc.id)) return;

        const icon = window.Engine.npcIconManager.getNpcIcon(npc.icon.id);

        const newNpc = {
          ...template,
          id: npc.id,
          tpl: npc.tpl,
          x: npc.x,
          y: npc.y,
          icon,
        };

        npcsMap.current.set(npc.id, newNpc);
      });
    }

    if (event.f && event.f.init === "1") {
      pendingBattle.current = event.f;
    }

    if (
      event.npcs_del &&
      event.f &&
      event.f.endBattle === 1 &&
      !!event.item &&
      !!event.loot &&
      event.loot.source === "fight"
    ) {
      const isPendingBattle = pendingBattle.current?.w !== null;

      if (isPendingBattle) {
        const { killedNpcs, partyMembers } = getBattleParticipants(
          pendingBattle.current?.w,
          event.f.w
        );

        const loots = getLoots(event.item);
        const npcs = killedNpcs.map((npc) => {
          return {
            icon: npc.icon,
            id: npc.id,
            prof: npc.prof,
            hpp: npc.hpp,
            type: npcsMap.current.get(npc.id)?.type || 0,
            wt: npc.wt,
            lvl: npc.lvl,
            name: npc.name,
            location: window.Engine.map.d.name,
          };
        });

        const payload = {
          world: window.Engine.worldConfig.getWorldName(),
          source: event.loot.source.toUpperCase(),
          location: window.Engine.map.d.name,
          npcs,
          loots,
          players: partyMembers,
        };

        createLoot(payload);
      }

      pendingBattle.current = null;
    }

    if (
      event.item &&
      event.loot &&
      event.loot.source === "dialog" &&
      event.npcs_del
    ) {
      const killedNpcs = event.npcs_del.reduce((acc: Partial<Npc>[], npc) => {
        if (!npcsMap.current.has(npc.id)) return acc;
        const npcData = npcsMap.current.get(npc.id);

        if (npcData) {
          acc.push({
            icon: npcData.icon,
            id: npcData.id,
            prof: npcData.prof,
            hpp: 0,
            type: npcData.type,
            wt: npcData.wt,
            lvl: npcData.lvl,
            name: npcData.nick,
            location: window.Engine.map.d.name,
          });
        }

        return acc;
      }, []);

      const payload = {
        world: window.Engine.worldConfig.getWorldName(),
        source: event.loot.source.toUpperCase(),
        location: window.Engine.map.d.name,
        loots: getLoots(event.item),
        npcs: killedNpcs,
        players: [
          {
            id: window.Engine.hero.d.id,
            name: window.Engine.hero.d.nick,
            icon: window.Engine.hero.d.img,
            prof: window.Engine.hero.d.prof,
            hpp: Math.floor(
              (window.Engine.hero.d.warrior_stats.hp /
                window.Engine.hero.d.warrior_stats.maxhp) *
                100
            ),
            lvl: window.Engine.hero.d.lvl,
            accountId: window.Engine.hero.d.account,
          },
        ],
      };

      createLoot(payload);
    }

    if (event.npcs_del) {
      event.npcs_del.forEach((npc) => {
        const npcData = npcsMap.current.get(npc.id);
        if (!npcData) return;

        const isWithinRange = checkIfNpcIsWithinRange(
          npcData as unknown as HeroD
        );

        if (!isWithinRange) {
          npcsMap.current.delete(npc.id);
          return;
        }

        const { respBaseSeconds } = npc;

        if (!respBaseSeconds) {
          npcsMap.current.delete(npc.id);
          return;
        }

        const { nick: name, resp_rand: respawnRandomness } = npcData;

        const payload = {
          respawnRandomness,
          respBaseSeconds,
          world: window.Engine.worldConfig.getWorldName(),
          npc: {
            icon: npcData.icon,
            id: npcData.id,
            prof: npcData.prof,
            wt: npcData.wt,
            hpp: 0,
            type: npcData.type,
            lvl: npcData.lvl,
            name: npcData.nick,
            location: window.Engine.map.d.name,
          },
        };

        createTimer(payload);

        npcsMap.current.delete(npc.id);
      });
    }
  };

  const prepareInitialNpcs = () => {
    const npcs = window.Engine.npcs.getDrawableList().filter((npc) => npc.d);

    npcs.forEach((npc) => {
      const isAllowedNpc = checkIfAllowedNpc(npc.d);
      if (!isAllowedNpc) return;

      npcsMap.current.set(npc.d.id, npc.d);
    });
  };

  useEffect(() => {
    if (!initialized || gameEventsParserInitialized) return;

    prepareInitialNpcs();
    setupGameEventsHandler();

    return () => {
      removeGameEventsHandler();
    };
  }, [initialized]);
};
