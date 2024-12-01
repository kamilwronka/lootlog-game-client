import { Item, ItemEvent } from "@/types/margonem/game-events/item";

export const getLoots = (items: ItemEvent = {}) => {
  const loots = Object.values(items).map((item) => {
    const { hid, icon, name, pr, prc, stat, cl, tpl } = item;

    return {
      id: tpl,
      hid,
      icon,
      name,
      pr,
      prc,
      stat,
      cl,
    };
  });

  return loots;
};
