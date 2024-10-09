import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthToken } from "../auth/use-auth-token";
import { API_URL } from "@/config/api";
import { useGuilds } from "@/hooks/api/useGuilds";
import { BattleParticipant } from "@/utils/game/get-battle-participants";
import { Item } from "@/types/margonem/game-events/item";
import { HeroD } from "@/types/margonem/hero";

export type UseCreateLootOptions = {
  killedNpcs: BattleParticipant[];
  partyMembers: BattleParticipant[];
  loots: Item[];
  creator: Partial<HeroD>;
  world: string;
};

export const useCreateLoot = () => {
  const token = useAuthToken();
  const { data: guilds } = useGuilds();

  const mutation = useMutation({
    mutationKey: ["create-loot"],
    mutationFn: (options: UseCreateLootOptions) => {
      const promiseArr =
        guilds?.forEach((guild) => {
          return axios.post(
            `${API_URL}/guilds/${guild.guildId}/loots`,
            options,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }) ?? [];

      return Promise.all(promiseArr);
    },
    onSuccess: () => {
      console.log("onSuccess");
    },
    onError: () => {
      console.log("onError");
    },
  });

  return mutation;
};
