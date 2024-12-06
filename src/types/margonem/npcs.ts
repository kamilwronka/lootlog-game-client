export type Npc = {
  d: NpcD;
};

export type NpcD = {
  icon: string;
  id: number;
  tpl: number;
  x: number;
  y: number;
  nick: string;
  prof: string;
  type: number;
  wt: number;
  actions: number;
  grp: number;
  lvl: number;
  resp_rand?: number;
};

export type Npcs = {
  getDrawableList: () => Npc[];
};
