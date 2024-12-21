export type Hero = {
  x?: number;
  y?: number;
  dir?: number;
  hp?: number;
  maxhp?: number;
};

export type Npc = {
  group?: number;
  icon: { id: number };
  id: number;
  tpl: number;
  x: number;
  y: number;
  isNonAggressive?: boolean;
  walkover?: boolean;
};

export type NpcTpl = {
  id: number;
  nick: string;
  type: number;
  warrior_type?: number;
  level?: number;
  prof?: Prof;
  resp_rand?: number;
  isHeroFromEvent?: boolean;
};

export type Icon = {
  id: number;
  icon: string;
};

export type NpcDel = {
  id: number;
  respBaseSeconds?: number;
};

export type Emo = {
  name: "noemo";
  source_id: number;
  source_type: number;
  end_ts: number;
};

export type FightWarrior = {
  originalId?: number;
  name?: string;
  lvl?: number;
  prof?: Prof;
  gender?: "m" | "f" | "x";
  npc?: 0 | 1;
  hpp: number;
  team?: 1 | 2;
  y?: number;
  icon?: string;
  wt?: number;
  mana?: number;
  energy?: number;
  mana0?: number;
  energy0?: number;
  fast?: number;
  ac?: { cur: number; bonus: number; destroyed?: number };
  resfire?: { cur: number; bonus: number };
  resfrost?: { cur: number; bonus: number };
  reslight?: { cur: number; bonus: number };
  act?: { cur: number; bonus: number };
  buffs?: number;
  cooldowns?: number[][];
  doublecastcost?: any[];
  combo?: number;
};

export type Fight = {
  endBattle?: 1;
  init?: "1";
  auto?: string;
  battleground?: string;
  skills_disabled?: [];
  skills_combo_max?: number[][];
  start_move?: number;
  current?: number;
  turns_warriors?: {
    [key: string]: number;
  };
  skills?: string[];
  myteam?: number;
  move?: number;
  m?: string[];
  mi?: number[];
  close?: number;
  w: {
    [key: string]: FightWarrior;
  };
};

export type ChatChannel = {
  archivedIds: number[];
  msg: {
    id: number;
    msg: string;
    style: number;
    ts: number;
  }[];
};

export type Chat = {
  channels?: {
    [key: string]: ChatChannel;
  };
};

export type Item = {
  hid: string;
  tpl: number;
  name: string;
  icon: string;
  cl: number;
  pr: number;
  prc: string;
  loc: ItemLocation;
  st: number;
  own: number;
  x: number;
  y: number;
  salvageItems?: number;
  enhancementPoints?: number;
  stat: string;
  del?: string;
};

export type Loot = {
  endTs: number;
  init: number;
  source: LootSource;
  states: {
    [key: string]: number;
  };
};

export type PartyMember = {
  id: number;
  account: number;
  nick: string;
  icon: string;
  commander?: number;
  hp_cur: number;
  hp_max: number;
};

export type Party = {
  members: {
    [key: string]: PartyMember;
  };
  partygrpkill: number;
  partyexp: number;
};

export type HeroLocalization = {
  kind: string;
  lvl: number;
  name: string;
  pos: number[][];
  resp: number;
  wtype: number;
};

export type HandheldMinimap = {
  hero_localizations: HeroLocalization[];
};

export type Config = {
  set: string[];
};

export type Other = {
  [key: string]: {
    x?: number;
    y?: number;
    dir?: number;
  };
};

export type Quests = {
  del: number[];
  data: string;
  track: string[];
  set_track: number;
};

export type MargonemEvent = {
  ev: number;
  e: string;
  matchmaking_state?: number;
  rewards_calendar_active?: number;
  handheld_minimap?: HandheldMinimap;
  config?: Config;
  h?: Hero;
  other?: Other;
  quests?: Quests;
  npcs?: Npc[];
  npc_tpls?: NpcTpl[];
  icons?: Icon[];
  npcs_del?: NpcDel[];
  emo?: Emo[];
  f?: Fight;
  chat?: Chat;
  item?: {
    [key: string]: Item;
  };
  loot?: Loot;
  party?: Party;
  d?: string[];
};

export type Prof = "h" | "m" | "w" | "t" | "p" | "b";
export type LootSource = "fight" | "dialog" | "lootbox";
export type ItemLocation = "g" | "c" | "l";
