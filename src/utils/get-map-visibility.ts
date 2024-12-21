import { isNi } from "@/utils/is-ni";

export const getMapVisibility = () => {
  return isNi() ? window.Engine.map.d.visibility : window.map.visibility;
};
