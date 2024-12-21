import eventEmitter from "@/event-emitter/event-emitter";
import { useCreateTimer } from "@/hooks/api/useCreateTimer";
import { MargonemEvent } from "@/types/margonem/game-events/event.type";
import { isNpcWithinHeroRange } from "@/utils/game/is-npc-within-hero-range";
import { getLocation } from "@/utils/get-location";
import { getNpcById } from "@/utils/get-npc-by-id";
import { getWorldName } from "@/utils/get-world-name";
import { useEffect } from "react";

export const TimersCollector = () => {
  const { mutate: createTimer } = useCreateTimer();

  const handleEvent = (event: MargonemEvent) => {
    const eventKeysLength = Object.keys(event).length;
    if (eventKeysLength <= 2) {
      return;
    }

    if (event.npcs_del) {
      event.npcs_del.forEach((npc) => {
        const npcData = getNpcById(npc.id);
        if (!npcData) return;

        const isWithinRange = isNpcWithinHeroRange(npcData);
        if (!isWithinRange) {
          return;
        }

        if (!npc.respBaseSeconds) {
          return;
        }

        const {
          resp_rand: respawnRandomness,
          isHeroFromEvent,
          icon,
          id,
          prof,
          wt,
          type,
          lvl,
          nick,
        } = npcData;

        const payload = {
          respawnRandomness,
          respBaseSeconds: npc.respBaseSeconds,
          world: getWorldName(),
          npc: {
            icon,
            id,
            prof,
            wt,
            type,
            lvl,
            name: nick,
            location: getLocation(),
            isHeroFromEvent,
          },
        };

        console.log("timer collected", payload);

        createTimer(payload);
      });
    }
  };

  useEffect(() => {
    console.log("setting up timers collector");
    const callback = (event: MargonemEvent) => {
      handleEvent(event);
    };
    eventEmitter.on("game-event", callback);

    return () => {
      console.log("removing timers collector");
      eventEmitter.off("game-event", callback);
    };
  }, []);

  return null;
};
