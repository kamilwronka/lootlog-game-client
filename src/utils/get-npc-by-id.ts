import { NpcData } from "@/types/margonem/npcs";
import { isNi } from "@/utils/is-ni";

export const getNpcById = (id: number): NpcData => {
  return isNi() ? window.Engine.npcs.getById(id)?.d : window.g.npc[id];
};
