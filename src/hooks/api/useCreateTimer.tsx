import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthToken } from "../auth/use-auth-token";
import { API_URL } from "@/config/api";
import { useGuilds } from "@/hooks/api/useGuilds";

export type UseCreateTimerOptions = {
  name: string;
  respawnRandomness?: number;
  respBaseSeconds: number;
};

export const useCreateTimer = () => {
  const token = useAuthToken();
  const { data: guilds } = useGuilds();

  const mutation = useMutation({
    mutationKey: ["create-timer"],
    mutationFn: (options: UseCreateTimerOptions) => {
      const promiseArr =
        guilds?.forEach((guild) => {
          return axios.post(
            `${API_URL}/guilds/${guild.guildId}/timers`,
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
