import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthToken } from "../auth/use-auth-token";
import { API_URL } from "@/config/api";

export type NpcDto = {
  id: number;
  name: string;
  icon: string;
  hpp?: number;
  prof: string;
  lvl: number;
  wt: number;
  location: string;
  type: number;
};

export type PartyMemberDto = {
  id: number;
  name: string;
  icon: string;
  hpp: number;
  prof: string;
  lvl: number;
  accountId: number;
};

export type ItemsDto = {
  hid: string;
  id: number;
  name: string;
  icon: string;
  pr: number;
  prc: string;
  cl: number;
  stat: string;
};

export type UseCreateLootOptions = {
  npcs: NpcDto[];
  players: PartyMemberDto[];
  loots: ItemsDto[];
  world: string;
};

export const useCreateLoot = () => {
  const token = useAuthToken();

  const mutation = useMutation({
    mutationKey: ["create-loot"],
    mutationFn: (options: UseCreateLootOptions) => {
      return axios.post(`${API_URL}/loots`, options, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
