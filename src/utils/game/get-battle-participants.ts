import { W } from "@/types/margonem/game-events/f";

export type PartyMember = {
  id: number;
  name: string;
  icon: string;
  hpp: number;
  prof: string;
  lvl: number;
  accountId: number;
};

export type KilledNpc = {
  id: number;
  name: string;
  icon: string;
  hpp: number;
  prof: string;
  lvl: number;
  wt: number;
  location: string;
  type: number;
};

export const getBattleParticipants = (
  initialParticipants: W | null,
  endParticipants: W | null
) => {
  if (!initialParticipants) return { party: [], npcs: [] };

  const { party, npcs } = Object.entries(initialParticipants).reduce(
    (acc: { npcs: KilledNpc[]; party: PartyMember[] }, [key, value]) => {
      if (key === window.Engine.hero.d.id.toString()) {
        acc.party.push({
          id: window.Engine.hero.d.id,
          name: window.Engine.hero.d.nick,
          icon: window.Engine.hero.d.img,
          hpp: value.hpp,
          prof: window.Engine.hero.d.prof,
          lvl: window.Engine.hero.d.lvl,
          accountId: window.Engine.hero.d.account,
        });

        return acc;
      }

      if (key.startsWith("-")) {
        const hpp = endParticipants?.[key.replace("-", "")]?.hpp ?? 0;
        const npcData = window.Engine.npcs.getById(value.originalId);

        if (!npcData) {
          acc.npcs.push({
            id: value.originalId,
            name: value.name,
            icon: value.icon,
            hpp: hpp,
            prof: value.prof,
            lvl: value.lvl,
            wt: value.wt,
            location: window.Engine.map.d.name,
            type: value.type ?? 2,
          });

          return acc;
        }

        acc.npcs.push({
          id: npcData.d.tpl,
          name: npcData.d.nick,
          icon: npcData.d.icon,
          hpp: hpp,
          prof: npcData.d.prof,
          lvl: npcData.d.lvl,
          wt: npcData.d.wt,
          location: window.Engine.map.d.name,
          type: npcData.d.type,
        });

        return acc;
      }

      const othersData = window.Engine.others.check();
      const other = othersData[key]?.d;

      if (other) {
        acc.party.push({
          id: +other.id,
          name: other.nick,
          icon: other.icon,
          hpp: value.hpp,
          prof: other.prof,
          lvl: other.lvl,
          accountId: other.account,
        });
      }

      return acc;
    },
    { party: [], npcs: [] }
  );

  return { party, npcs };
};
