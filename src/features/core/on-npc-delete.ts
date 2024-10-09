import { useGlobalContext } from "@/contexts/global-context";
import { NpcsDel } from "@/types/margonem/game-events/npcs_del";

export const onNpcDelete = (npcs: NpcsDel) => {
  const { initialized } = useGlobalContext();

  console.log(initialized, npcs);
};
