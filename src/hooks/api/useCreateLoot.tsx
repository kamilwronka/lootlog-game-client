import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthToken } from "../auth/use-auth-token";
import { API_URL } from "@/config/api";
import { useGuilds } from "@/hooks/api/useGuilds";
import { BattleParticipant } from "@/utils/game/get-battle-participants";
import { Item } from "@/types/margonem/game-events/item";

export type UseCreateLootOptions = {
  npcs: BattleParticipant[];
  players: (BattleParticipant & { accountId: number })[];
  loots: Partial<Item>[];
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
          return axios.post(`${API_URL}/guilds/${guild.id}/loots`, options, {
            headers: { Authorization: `Bearer ${token}` },
          });
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
