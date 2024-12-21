import eventEmitter from "@/event-emitter/event-emitter";
import { mapItemsToLoot } from "@/features/loot-collector/mappers/map-items-to-loot";
import { mapNpcIdsToNpcs } from "@/features/loot-collector/mappers/map-npc-ids-to-npcs";
import { getLootDistribution } from "@/features/loot-collector/utils/get-loot-distribution";
import {
  NpcDto,
  PartyMemberDto,
  useCreateLoot,
} from "@/hooks/api/useCreateLoot";
import { Fight, MargonemEvent } from "@/types/margonem/game-events/event.type";
import { getHeroData } from "@/utils/get-hero-data";
import { getWorldName } from "@/utils/get-world-name";
import { merge } from "lodash";
import { useEffect, useRef } from "react";

export const LootCollector = () => {
  const { mutate: createLoot } = useCreateLoot();

  const dialogNpcId = useRef<string>("0");
  const battle = useRef<Fight | null>(null);
  const npcs = useRef<NpcDto[]>([]);
  const lootItems = useRef<any>(null);

  const handleLootEvent = (event: MargonemEvent) => {
    if (!event.loot || !event.item) return;
    const { loot, item } = event;

    const preparedLoot = mapItemsToLoot(item, "common");
    if (preparedLoot.length === 0) return;

    let npcs: NpcDto[] = [];
    let players: PartyMemberDto[] = [];

    if (loot.source === "dialog") {
      if (event.npcs_del) {
        npcs = mapNpcIdsToNpcs(event.npcs_del.map((npc) => npc.id));
      } else {
        npcs = mapNpcIdsToNpcs([+dialogNpcId]);
      }

      const {
        id,
        nick,
        img,
        prof,
        warrior_stats: { hp, maxhp },
        lvl,
        account,
      } = getHeroData();

      players = [
        {
          id,
          name: nick,
          icon: img,
          prof,
          hpp: Math.floor((hp / maxhp) * 100),
          lvl,
          accountId: account,
        },
      ];
    }

    if (loot.source === "fight") {
      if (battle.current) {
        const { players: playersData } = battle.current.w;
        players = playersData.map((player) => {
          const { id, nick, img, prof, hp, maxhp, lvl, account } = player;
          return {
            id,
            name: nick,
            icon: img,
            prof,
            hpp: Math.floor((hp / maxhp) * 100),
            lvl,
            accountId: account,
          };
        });
      }
    }

    createLoot({
      loots: preparedLoot,
      npcs,
      world: getWorldName(),
      players,
    });

    console.log(preparedLoot);
  };

  const handleEvent = (event: MargonemEvent) => {
    const eventEntriesLength = Object.keys(event).length;
    if (eventEntriesLength <= 2) {
      return;
    }

    if (event.d) {
      const npcId = event.d[2];
      if (npcId && npcId.length > 0) {
        dialogNpcId.current = event.d[2];
      }
    }

    if (event.f) {
      if (!battle.current) {
        battle.current = event.f;
      } else {
        battle.current = merge(battle.current, event.f);
      }
    }

    if (event.item && event.loot) {
      handleLootEvent(event);
    }

    if (event.chat && event.chat.channels?.["system"]) {
      console.log(event.chat.channels["system"]);
      const systemChannel = event.chat.channels["system"];

      const lootDistribution = getLootDistribution(systemChannel);
      console.log(lootDistribution);

      // lootPayload = null;
    }

    if (event.f?.endBattle === 1) {
      console.log(battle.current);
      battle.current = null;
    }

    // console.log(event);
  };

  useEffect(() => {
    console.log("setting up loot collector");
    const callback = (event: MargonemEvent) => {
      handleEvent(event);
    };
    eventEmitter.on("game-event", callback);

    return () => {
      console.log("removing loot collector");
      eventEmitter.off("game-event", callback);
    };
  }, []);

  return null;
};
