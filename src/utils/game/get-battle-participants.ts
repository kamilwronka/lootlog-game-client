import { W } from "@/types/margonem/game-events/f";
import { NpcD } from "@/types/margonem/npcs";
import { OtherD } from "@/types/margonem/others";

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
  participants: W,
  npcs: Map<string, NpcD>,
  others: Map<string, OtherD>
) => {
  if (!participants) return { partyMembers: [], killedNpcs: [] };

  const { partyMembers, killedNpcs } = Object.entries(participants).reduce(
    (
      acc: { killedNpcs: KilledNpc[]; partyMembers: PartyMember[] },
      [key, value]
    ) => {
      if (key === window.Engine.hero.d.id.toString()) {
        acc.partyMembers.push({
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
        const npc = npcs.get(key.replace("-", ""));

        if (npc) {
          acc.killedNpcs.push({
            id: npc.tpl,
            name: npc.nick,
            icon: npc.icon,
            hpp: value.hpp,
            prof: npc.prof,
            lvl: npc.lvl,
            wt: npc.wt,
            location: window.Engine.map.d.name,
            type: npc.type,
          });
        }

        return acc;
      }

      const other = others.get(key);

      if (other) {
        acc.partyMembers.push({
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
    { partyMembers: [], killedNpcs: [] }
  );

  return { partyMembers, killedNpcs };
};
