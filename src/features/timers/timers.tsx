import { DraggableWindow } from "@/components/draggable-window";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalContext } from "@/contexts/global-context";
import { SingleTimer } from "@/features/timers/components/single-timer";
import { useGuilds } from "@/hooks/api/use-guilds";
import { NpcType } from "@/hooks/api/use-npcs";
import { useTimers } from "@/hooks/api/use-timers";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { groupBy } from "lodash";
import { useState } from "react";

const SORT_ORDER = [
  NpcType.TITAN,
  NpcType.COLOSSUS,
  NpcType.HERO,
  NpcType.ELITE2,
  NpcType.ELITE,
];
const NPC_NAMES: { [key: string]: string } = {
  TITAN: "Tytan",
  COLOSSUS: "Kolos",
  HERO: "Heros",
  ELITE3: "Elita III",
  ELITE2: "Elita II",
  ELITE: "Elita",
};

export const Timers = () => {
  const { data: guilds } = useGuilds();
  const [selectedGuildId, setSelectedGuildId] = useState<string | undefined>(
    undefined
  );
  const { timersOpen } = useGlobalContext();

  const { data: timers } = useTimers({ guildId: selectedGuildId });

  const sorted = timers?.sort((a, b) => {
    return SORT_ORDER.indexOf(a.npc.type) - SORT_ORDER.indexOf(b.npc.type);
  });

  const groups = groupBy(sorted, "npc.type");

  return (
    timersOpen && (
      <DraggableWindow id="timers">
        <div className="ll-bg-current ll-w-[225px] ll-p-2">
          <Select value={selectedGuildId} onValueChange={setSelectedGuildId}>
            <SelectTrigger className="w-[180px] ll-text-white ll-border-white">
              <SelectValue placeholder="Wybierz lootlog..." />
            </SelectTrigger>
            <SelectContent>
              {guilds?.map((guild) => {
                return (
                  <SelectItem key={guild.id} value={guild.id}>
                    {guild.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <ScrollArea className="ll-mt-2 ll-text-white" type="scroll">
            {Object.keys(groups).map((key) => {
              return (
                <div key={key} className="ll-border-b">
                  <p className="ll-text-sm ll-capitalize ll-font-semibold ll-py-1 ll-border-b">
                    {NPC_NAMES[key]} - {groups[key].length}
                  </p>
                  <div>
                    {groups[key]?.map((timer) => {
                      return (
                        <SingleTimer
                          key={timer.id}
                          timer={timer}
                          guildId={selectedGuildId}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        </div>
      </DraggableWindow>
    )
  );
};
