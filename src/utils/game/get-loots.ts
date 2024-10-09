import { Item, ItemEvent } from "@/types/margonem/game-events/item";

export const getLoots = (items: ItemEvent = {}) => {
  const loots = Object.values(items).map((item) => {
    const { hid, icon, name, pr, prc, st, stat, own } = item;

    return {
      hid,
      icon,
      name,
      pr,
      prc,
      st,
      stat,
      own,
    };
  });

  return loots;
};
