import { parseItemStats } from "@/utils/parse-item-stats";
import {
  ItemLocation,
  MargonemEvent,
} from "@/types/margonem/game-events/event.type";
import { ItemsDto } from "@/hooks/api/useCreateLoot";
import { Rarity } from "@/types/margonem/rarity";

const RARITY_ORDER: Rarity[] = [
  "common",
  "unique",
  "heroic",
  "upgraded",
  "legendary",
];
const ALLOWED_LOCATIONS: ItemLocation[] = ["l", "c"];

export const mapItemsToLoot = (
  itemEvent: MargonemEvent["item"],
  minRarity: Rarity
) => {
  if (!itemEvent) return [];
  const minRarityIndex = RARITY_ORDER.findIndex((rarity) =>
    minRarity.includes(rarity)
  );

  const loot = Object.values(itemEvent).reduce((acc: ItemsDto[], item) => {
    const { name, icon, loc, stat, cl, hid, tpl, pr, prc } = item;
    if (!ALLOWED_LOCATIONS.includes(loc)) return acc;

    const stats = parseItemStats(stat);
    const itemRarityIndex = RARITY_ORDER.findIndex((rarity) => {
      return stats.rarity === rarity;
    });

    if (itemRarityIndex < minRarityIndex) return acc;

    const data: ItemsDto = {
      name,
      icon,
      cl,
      hid,
      id: tpl,
      pr,
      prc,
      stat,
    };

    acc.push(data);
    return acc;
  }, []);

  return loot;
};
