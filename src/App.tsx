import { Timers } from "@/features/timers/timers";
import { Settings } from "@/features/settings/settings";
import { useGameEventsParser } from "@/hooks/use-game-events-parser";

function App() {
  useGameEventsParser();

  return (
    <>
      <Timers />
      <Settings />
    </>
  );
}

export default App;
