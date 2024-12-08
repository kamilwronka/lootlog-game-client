export const getLootCreator = () => {
  const { id, lvl, account, prof, img, nick } = window.Engine.hero.d;

  return {
    id,
    lvl,
    account,
    prof,
    img,
    nick,
  };
};
