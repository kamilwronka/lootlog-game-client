import { LootDto } from "@/hooks/api/useCreateLoot";
import { ItemEvent } from "@/types/margonem/game-events/item";

export const getLoot = (items: ItemEvent = {}): LootDto[] => {
  const loots = Object.values(items).reduce((acc: LootDto[], item) => {
    const { hid, icon, name, pr, prc, stat, cl, tpl, loc } = item;

    if (loc === "l") {
      acc.push({
        id: tpl,
        hid,
        icon,
        name,
        pr,
        prc,
        stat,
        cl,
      });
    }

    return acc;
  }, []);

  return loots;
};
