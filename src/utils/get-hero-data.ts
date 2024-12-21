import { isNi } from "@/utils/is-ni";

export const getHeroData = () => {
  return isNi() ? window.Engine.hero.d : window.hero;
};
