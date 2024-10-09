export type Npc = {
  d: {
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
  };
};

export type Npcs = {
  getDrawableList: () => Npc[];
};
