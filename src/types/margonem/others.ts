export type OtherD = {
  account: number;
  icon: string;
  id: string;
  lvl: number;
  prof: string;
  nick: string;
};

export type Other = {
  d: OtherD;
};

export type Others = {
  check: () => Other[];
};
