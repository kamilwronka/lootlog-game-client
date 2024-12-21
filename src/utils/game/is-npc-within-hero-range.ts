import { NpcData } from "@/types/margonem/npcs";
import { getHeroData } from "@/utils/get-hero-data";
import { getMapVisibility } from "@/utils/get-map-visibility";

export const isNpcWithinHeroRange = (npc: NpcData) => {
  const mapVisibility = getMapVisibility();
  if (mapVisibility === 0) return true;

  const { x, y } = npc;
  const { x: heroX, y: heroY } = getHeroData();

  const distance = Math.sqrt((x - heroX) ** 2 + (y - heroY) ** 2);

  return distance <= mapVisibility;
};
