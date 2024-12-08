import { ChangePlayerCharacter } from "@/types/margonem/change-player";

const data = {
  "617": {
    id: 617,
    nick: "gorilla banana",
    world: "gordion",
    lvl: 300,
    prof: "h",
    gender: "m",
    icon: "/eve/wiel23-dzieci-ind-k.gif",
    last: 1732471692,
    clan: 692,
    clan_rank: 99,
  },
  "7424": {
    id: 7424,
    nick: "banana gorilla",
    world: "gordion",
    lvl: 271,
    prof: "h",
    gender: "m",
    icon: "/hun/80/m_hun04.gif",
    last: 1732469546,
    clan: 1517,
    clan_rank: 0,
  },
  "30016": {
    id: 30016,
    nick: "banana banana",
    world: "gordion",
    lvl: 134,
    prof: "w",
    gender: "m",
    icon: "/eve/sab24-makabara.gif",
    last: 1731555281,
    clan: 0,
    clan_rank: 0,
  },
  "30017": {
    id: 30017,
    nick: "gorilla gorilla",
    world: "gordion",
    lvl: 210,
    prof: "m",
    gender: "m",
    icon: "/eve/g23-kal-zima-k.gif",
    last: 1731950941,
    clan: 256,
    clan_rank: 0,
  },
  "52731": {
    id: 52731,
    nick: "goryl ogromny",
    world: "gordion",
    lvl: 114,
    prof: "w",
    gender: "m",
    icon: "/eve/grzyb23-c3-u-k.gif",
    last: 1731969211,
    clan: 27,
    clan_rank: 95,
  },
  "52785": {
    id: 52785,
    nick: "ogromny goryl",
    world: "gordion",
    lvl: 244,
    prof: "b",
    gender: "m",
    icon: "/eve/h24-duch.gif",
    last: 1732325174,
    clan: 1517,
    clan_rank: 0,
  },
  "287335": {
    id: 287335,
    nick: "gorilla banana",
    world: "aether",
    lvl: 1,
    prof: "b",
    gender: "m",
    icon: "/noob/bm.gif",
    last: 1720812930,
    clan: 0,
    clan_rank: 0,
  },
  "328078": {
    id: 328078,
    nick: "zdaninek",
    world: "brutal",
    lvl: 44,
    prof: "w",
    gender: "m",
    icon: "/noob/wm.gif",
    last: 1721274959,
    clan: 1304,
    clan_rank: 0,
  },
  "379340": {
    id: 379340,
    nick: "gorilla banana",
    world: "fobos",
    lvl: 52,
    prof: "t",
    gender: "m",
    icon: "/kuf/prof_xxix_mag_k.gif",
    last: 1729334561,
    clan: 3750,
    clan_rank: 100,
  },
  "613755": {
    id: 613755,
    nick: "alan terror",
    world: "nomada",
    lvl: 1,
    prof: "p",
    gender: "m",
    icon: "/noob/pm.gif",
    last: 1720839722,
    clan: 0,
    clan_rank: 0,
  },
  "914087": {
    id: 914087,
    nick: "gorilla banana",
    world: "gefion",
    lvl: 80,
    prof: "t",
    gender: "m",
    icon: "/paid/zakon_rm1.gif",
    last: 1720812864,
    clan: 10264,
    clan_rank: 100,
  },
};

export const mapCharListToPayload = (
  characters: Record<string, ChangePlayerCharacter>,
  {
    accountId,
    canAddLoot,
    canAddTimer,
  }: { accountId: number; canAddLoot: boolean; canAddTimer: boolean }
) => {
  return Object.values(characters).map(({ id, nick, prof, icon, lvl }) => {
    return {
      id,
      name: nick,
      prof,
      icon,
      lvl,
      accountId,
      canAddLoot,
      canAddTimer,
    };
  });
};

mapCharListToPayload(data, {
  accountId: 1,
  canAddLoot: true,
  canAddTimer: true,
});
