import { Timer, useTimers } from "@/hooks/api/use-timers";
import { cn } from "@/lib/utils";
import { parseMsToTime } from "@/utils/parse-ms-to-time";
import { FC, useEffect, useState } from "react";

type SingleTimerProps = {
  timer: Timer;
  guildId?: string;
};

const THRESHOLD = 30000;

export const SingleTimer: FC<SingleTimerProps> = ({ timer, guildId }) => {
  const maxSpawnTime = new Date(timer.maxSpawnTime).getTime();
  const minSpawnTime = new Date(timer.minSpawnTime).getTime();

  const { refetch } = useTimers({ guildId });
  const [timeLeft, setTimeLeft] = useState(maxSpawnTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const time = maxSpawnTime - Date.now();

      if (time <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        refetch();

        return;
      }

      setTimeLeft(time);
    }, 1000);

    return () => clearInterval(interval);
  }, [maxSpawnTime, refetch]);

  const isMinSpawnTime = minSpawnTime - Date.now() < 0;
  const hasPassedRedThreshold = timeLeft < THRESHOLD;

  return (
    <div className="ll-flex ll-flex-row ll-justify-between ll-py-1 ll-gap-3 ll-min-h-4 ll-items-center ll-hover:bg-accent ll-cursor-pointer">
      <span
        className={cn(
          "ll-font-semibold ll-text-xs ll-transition-all ll-flex ll-flex-row ll-gap-2 ll-items-center",
          {
            "ll-text-orange-400": isMinSpawnTime,
            "ll-text-red-500": hasPassedRedThreshold,
          }
        )}
      >
        <div className="ll-flex ll-flex-col">
          <span className="ll-text-xs">{timer.npc.name}</span>
        </div>
      </span>
      <span
        className={cn("ll-transition-all ll-text-xs", {
          "ll-text-orange-400": isMinSpawnTime,
          "ll-text-red-500": hasPassedRedThreshold,
        })}
      >
        {parseMsToTime(timeLeft)}
      </span>
    </div>
  );
};
