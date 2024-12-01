import { W } from "@/types/margonem/game-events/f";

export type BattleParticipant = Partial<W[string]>;

export const getBattleParticipants = (
  initialBattleParticipants: W | undefined,
  endBattleParticipants: W | undefined
) => {
  if (!initialBattleParticipants || !endBattleParticipants)
    return { partyMembers: [], killedNpcs: [] };

  const { partyMembers, killedNpcs } = Object.values(
    initialBattleParticipants
  ).reduce(
    (
      acc: {
        partyMembers: (BattleParticipant & { accountId: number })[];
        killedNpcs: BattleParticipant[];
      },
      battleParticipant
    ) => {
      const { originalId, prof, name, icon, wt, lvl } = battleParticipant;

      const necessaryData = {
        id: originalId,
        prof,
        name,
        icon,
        hpp: endBattleParticipants[originalId]?.hpp || 0,
        lvl,
      };

      if (battleParticipant.team === 1) {
        acc.partyMembers.push({
          ...necessaryData,
          accountId: window.Engine.hero.d.account,
        });
      }

      if (battleParticipant.team === 2) {
        acc.killedNpcs.push({ ...necessaryData, wt });
      }

      return acc;
    },
    { partyMembers: [], killedNpcs: [] }
  );

  return { partyMembers, killedNpcs };
};
