import { useGlobalContext } from "@/contexts/global-context";
import eventEmitter from "@/event-emitter/event-emitter";
import { isNi } from "@/utils/is-ni";
import { useEffect, useRef } from "react";

export const useGameEventsInterceptor = () => {
  const interceptorsAttached = useRef(false);
  const { initialized } = useGlobalContext();

  const setupInterceptors = () => {
    console.log("initializing game events interceptor");

    if (isNi()) {
      window.Engine.communication.ogSuccessData =
        window.Engine.communication.successData.bind(
          window.Engine.communication
        );
      window.Engine.communication.successData = (response) => {
        eventEmitter.emit("game-event", JSON.parse(response));
        window.Engine.communication.ogSuccessData?.(response);
      };
    } else {
      window.ogSuccessData = window.successData.bind(window);
      window.successData = (response) => {
        eventEmitter.emit("game-event", JSON.parse(response));
        window.ogSuccessData?.(response);
      };
    }

    interceptorsAttached.current = true;
  };

  const removeInterceptors = () => {
    console.log("removing game events interceptor");

    if (isNi()) {
      if (!window.Engine.communication.ogSuccessData) return;

      window.Engine.communication.successData =
        window.Engine.communication.ogSuccessData;
      window.Engine.communication.ogSuccessData = null;
    } else {
      if (!window.ogSuccessData) return;

      window.successData = window.ogSuccessData;
      window.ogSuccessData = null;
    }

    interceptorsAttached.current = false;
  };

  useEffect(() => {
    if (initialized && !interceptorsAttached.current) {
      setupInterceptors();
      return;
    }

    return () => {
      removeInterceptors();
    };
  }, [initialized]);
};
