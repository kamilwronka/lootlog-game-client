// @ts-nocheck
import { useEffect } from "react";
import { isEmpty } from "lodash";

type GameEventsParserCallbacks = {
  onChatMessage?: (e: unknown) => void;
  onBattleEnd?: (e: unknown) => void;
  onNpcDelete?: (e: unknown) => void;
  onNpcCreate?: (e: unknown) => void;
};

export const useGameEventsParser = (
  initialized: boolean,
  {
    onBattleEnd,
    onChatMessage,
    onNpcCreate,
    onNpcDelete,
  }: GameEventsParserCallbacks = {}
) => {
  const initializeGameEventsParser = () => {
    if (window.Engine.communication.ogSuccessData) return;

    window.Engine.communication.ogSuccessData =
      window.Engine.communication.successData.bind(window.Engine.communication);

    Engine.communication.successData = (response) => {
      Engine.communication.ogSuccessData(response);
      const parsedEvent = JSON.parse(response);

      handleGameEvent(parsedEvent);

      // if (parsed && parsed.f && parsed.f.w && !parsed.f.endBattle) {
      //   isBattleStarted = true;
      //   data.start = parsed;
      // }

      // if (parsed && parsed.f && parsed.f.w && parsed.f.endBattle === 1) {
      //   data.end = parsed;
      //   isBattleStarted = false;

      //   bcBroadcaster.postMessage(data);
      //   data = {
      //     start: {},
      //     end: {},
      //   };
      // }
    };
  };

  const handleGameEvent = (e: unknown) => {
    // console.log(e);

    if (e.chat) {
      console.log("chat message", e);
      onChatMessage?.(e.chat)();
    }

    if (e.npc) {
      console.log("npc change", e);
      let deletedNpcs = {};
      let createdNpcs = {};

      Object.entries(e.npc).forEach(([key, value]) => {
        if (value.del === 1) {
          deletedNpcs[key] = value;
          return;
        }

        createdNpcs[key] = value;
      });

      if (!isEmpty(deletedNpcs)) {
        onNpcDelete?.(deletedNpcs);
      }

      if (!isEmpty(createdNpcs)) {
        onNpcCreate?.(createdNpcs);
      }
    }

    if (e.f && e.f.endBattle) {
      console.log("battle end", e);
      onBattleEnd?.(e.f.endBattle);
    }
  };

  useEffect(() => {
    if (!initialized) {
      return;
    }

    initializeGameEventsParser();
  }, [initialized]);

  return { onBattleEnd };
};
