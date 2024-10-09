import { F } from "@/types/margonem/game-events/f";
import { Item, ItemEvent } from "@/types/margonem/game-events/item";
import { Npcs } from "@/types/margonem/game-events/npcs";
import { NpcsDel } from "@/types/margonem/game-events/npcs_del";

export type GameEvent = {
  e: "ok" | "error";
  ev: number;
  f?: F;
  npcs?: Npcs;
  npcs_del?: NpcsDel;
  item?: ItemEvent;
};
