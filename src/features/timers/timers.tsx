import { DraggableWindow } from "@/components/draggable-window";
import { ScrollArea } from "@/components/ui/scroll-area";
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

const SORT_ORDER = [
  NpcType.TITAN,
  NpcType.COLOSSUS,
  NpcType.HERO,
  NpcType.ELITE2,
  NpcType.ELITE,
];

export const Timers = () => {
  const { data: guilds } = useGuilds();
  const { timersOpen, selectedGuild, setSelectedGuild } = useGlobalContext();

  const { data: timers } = useTimers({ guildId: selectedGuild });

  const sorted = timers?.sort((a, b) => {
    return SORT_ORDER.indexOf(a.npc.type) - SORT_ORDER.indexOf(b.npc.type);
  });

  // const groups = groupBy(sorted, "npc.type");

  return (
    timersOpen && (
      <DraggableWindow id="timers">
        <div
          data-opacity-lvl="4"
          className="border-window transparent elite-timer"
          style={{ position: "relative" }}
        >
          <div className="header-label-positioner">
            <div className="header-label">
              <div className="left-decor"></div>
              <div className="right-decor"></div>
              <div className="text">Lootlog</div>
            </div>
          </div>
          <div className="border-image"></div>
          <div className="close-button-corner-decor">
            <button type="button" className="close-button"></button>
          </div>
          <div className="content">
            <Select value={selectedGuild} onValueChange={setSelectedGuild}>
              <SelectTrigger className="w-[180px] ll-text-white ll-border-white ll-h-4 ll-my-1">
                <SelectValue
                  placeholder="Wybierz lootlog..."
                  className="ll-h-4"
                />
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
            <div className="inner-content">
              <div className="window-list elite-timer-wnd">
                <div className="scroll-wrapper">
                  <ScrollArea className="ll-h-64 ll-py-1">
                    <div className="scroll-pane">
                      {sorted?.length === 0 && (
                        <div className="empty">----</div>
                      )}
                      <div className="list npc-list">
                        {sorted?.map((timer) => {
                          return (
                            <SingleTimer
                              key={timer.npc.id}
                              timer={timer}
                              guildId={selectedGuild}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DraggableWindow>
    )
  );
};
