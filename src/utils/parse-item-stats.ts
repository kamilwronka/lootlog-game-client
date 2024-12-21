export const parseItemStats = (stat: string) => {
  const statsArray = stat.split(";");
  const statsObj = statsArray.reduce((acc: { [key: string]: string }, stat) => {
    const [key, value] = stat.split("=");
    acc[key] = value ?? "true";
    return acc;
  }, {});

  return statsObj;
};
