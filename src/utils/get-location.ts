import { isNi } from "@/utils/is-ni";

export const getLocation = (): string => {
  return isNi() ? window.Engine.map.d.name : window.map.name;
};
