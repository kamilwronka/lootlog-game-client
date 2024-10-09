import { useGlobalContext } from "@/contexts/global-context";
import { useCreateLoot } from "@/hooks/api/useCreateLoot";
import { useCreateTimer } from "@/hooks/api/useCreateTimer";
import { F } from "@/types/margonem/game-events/f";
import { GameEvent } from "@/types/margonem/game-events/game-event";
import { checkIfNpcIsMonster } from "@/utils/game/check-if-npc-is-monster";
import { checkIfNpcIsWithinRange } from "@/utils/game/check-if-npc-within-range";
import { getBattleParticipants } from "@/utils/game/get-battle-participants";
import { getLootCreator } from "@/utils/game/get-loot-creator";
import { getLoots } from "@/utils/game/get-loots";
import { useEffect, useRef, useState } from "react";

export const useGameEventsParser = () => {
  const { initialized } = useGlobalContext();
  const [gameEventsParserInitialized, setGameEventsParserInitialized] =
    useState(false);
  const pendingBattle = useRef<F | null>(null);
  const npcsMap = useRef(new Map());
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

        const isMob = checkIfNpcIsMonster(template);
        if (!isMob) return;
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
      console.log("onBattleStart");
      pendingBattle.current = event.f;
    }

    if (event.npcs_del && event.f && event.f.endBattle === 1) {
      console.log("onBattleEnd");
      const isBattleFinished = event.f.endBattle === 1;
      const hasLoot = !!event.item;
      const isPendingBattle = pendingBattle.current?.w !== null;

      if (isBattleFinished && hasLoot && isPendingBattle) {
        const { killedNpcs, partyMembers } = getBattleParticipants(
          pendingBattle.current?.w,
          event.f.w
        );
        const loots = getLoots(event.item);
        const creator = getLootCreator();

        const payload = {
          killedNpcs,
          partyMembers,
          loots,
          creator,
          world: window.Engine.worldConfig.getWorldName(),
        };

        createLoot(payload);

        console.log("server send payload: ", payload);
      }

      pendingBattle.current = null;
    }

    if (event.npcs_del) {
      event.npcs_del.forEach((npc) => {
        if (!npcsMap.current.has(npc.id)) return;
        const npcData = npcsMap.current.get(npc.id);
        const isWithinRange = checkIfNpcIsWithinRange(npcData);

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
          name,
          respawnRandomness,
          respBaseSeconds,
        };

        console.log("timers server send payload", payload);

        createTimer(payload);

        npcsMap.current.delete(npc.id);
      });
    }

    console.log("handling event", event);
  };

  const prepareInitialNpcs = () => {
    const npcs = window.Engine.npcs.getDrawableList().filter((npc) => npc.d);

    npcs.forEach((npc) => {
      const isMob = checkIfNpcIsMonster(npc.d);
      if (!isMob) return;

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
