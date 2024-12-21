import { Timers } from "@/features/timers/timers";
import { Settings } from "@/features/settings/settings";
import { useGlobalContext } from "./contexts/global-context";
import { useGameEventsInterceptor } from "@/hooks/use-game-events-interceptor";
import { TimersCollector } from "@/features/timers-collector/timers-collector";
import { LootCollector } from "@/features/loot-collector/loot-collector";

function App() {
  const { initialized } = useGlobalContext();

  useGameEventsInterceptor();

  return initialized ? (
    <>
      <Timers />
      <Settings />
      <TimersCollector />
      <LootCollector />
    </>
  ) : null;
}

export default App;
