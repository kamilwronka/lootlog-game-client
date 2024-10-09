import { Hero } from "@/types/margonem/hero";

export const checkIfNpcIsWithinRange = (npc: Hero["d"]) => {
  const mapVisibility = window.Engine.map.d.visibility;

  if (mapVisibility === 0) return true;

  const { x, y } = npc;
  const { x: heroX, y: heroY } = window.Engine.hero.d;

  const distance = Math.sqrt((x - heroX) ** 2 + (y - heroY) ** 2);

  return distance <= mapVisibility;
};
