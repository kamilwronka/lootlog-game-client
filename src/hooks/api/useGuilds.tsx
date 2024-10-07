import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthToken } from "../auth/use-auth-token";
import { API_URL } from "@/config/api";

export type GuildRole = {
  id: string;
  name: string;
  color: number;
};

export type Guild = {
  _id: string;
  guildId: string;
  name: string;
  icon: string | null;
  initialized: boolean;
  roles: GuildRole[];
};

export const useGuilds = () => {
  const token = useAuthToken();

  const query = useQuery({
    queryKey: ["user-guilds"],
    queryFn: () =>
      axios.get<Guild[]>(`${API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token,
    select: (response) => response.data,
  });

  return query;
};
