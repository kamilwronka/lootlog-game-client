import { Interface } from "@/types/margonem/interface";
import { Npcs } from "./npcs";
import { Communication } from "@/types/margonem/communication";
import { Hero } from "@/types/margonem/hero";
import { Map } from "@/types/margonem/map";
import { NpcTplManager } from "@/types/margonem/npc-tpl-manager";
import { NpcIconManager } from "@/types/margonem/npc-icon-manager";
import { WorldConfig } from "@/types/margonem/world-config";

export type Engine = {
  npcs: Npcs;
  interface: Interface;
  communication: Communication;
  hero: Hero;
  map: Map;
  npcTplManager: NpcTplManager;
  npcIconManager: NpcIconManager;
  worldConfig: WorldConfig;
};
