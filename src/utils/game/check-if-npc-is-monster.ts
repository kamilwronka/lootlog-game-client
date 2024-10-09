import { NpcTpl } from "@/types/margonem/npc-tpl-manager";

export const checkIfNpcIsMonster = (template: NpcTpl) => {
  return template.type === 3 || template.type === 2;
};
