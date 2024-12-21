import { NpcDto } from "@/hooks/api/useCreateLoot";
import { getLocation } from "@/utils/get-location";
import { getNpcById } from "@/utils/get-npc-by-id";

export const mapNpcIdsToNpcs = (npcIds: number[]) => {
  const location = getLocation();

  return npcIds.reduce((acc: NpcDto[], npcId) => {
    const npcData = getNpcById(npcId);

    if (npcData) {
      acc.push({
        id: npcData.tpl,
        name: npcData.nick,
        icon: npcData.icon,
        prof: npcData.prof,
        lvl: npcData.lvl,
        wt: npcData.wt,
        location,
        type: npcData.type,
      });
    }
    return acc;
  }, []);
};
