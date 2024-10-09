export type W = {
  [key: string]: {
    originalId: number;
    name: string;
    lvl: number;
    prof: string;
    hpp: number;
    icon: string;
    team: number;
    wt: number;
  };
};

export type F = {
  close?: number;
  endBattle?: number;
  m?: string[];
  mi?: number[];
  auto?: "0" | "1";
  battleground?: string;
  current?: number;
  init?: "1";
  move?: number;
  myteam?: number;
  w: W;
};
