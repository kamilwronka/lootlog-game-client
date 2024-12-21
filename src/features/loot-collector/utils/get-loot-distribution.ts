import { ChatChannel } from "@/types/margonem/game-events/event.type";

const lootDistributionRegex =
  /(\w+?)\sotrzymał\sITEM#([a-f0-9]{64}):"([^"]*)"/g;

export const getLootDistribution = (channel: ChatChannel) => {
  const lootDistribution = channel.msg.reduce(
    (acc: { [key: string]: string }, msg) => {
      let match;
      while ((match = lootDistributionRegex.exec(msg.msg)) !== null) {
        const [, nick, itemHid] = match;
        acc[nick] = itemHid;
      }

      return acc;
    },
    {}
  );

  return lootDistribution;
};
