import { isNi } from "@/utils/is-ni";

export const getWorldName = () => {
  return isNi()
    ? window.Engine?.worldConfig?.getWorldName()
    : window.g?.worldConfig?.getWorldName();
};
