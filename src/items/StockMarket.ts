import { ChartCandlestick as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Stock Market",
  rarity: 2,
  dropWeight: 100,

  // Don't change
  level: 1,
  startingLevel: 1,
  memory: {},
  id: "",
};

export const itemMeta: ItemMeta = {
  icon: ItemIcon,
  getDescription: (item) =>
    `**After Skip**: For every **$${Math.round(itemUtils.geometricSeries(item.level - 1, 0.975, 50, 5))}** that you have, gain +$1.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  afterSkipLecture: (params) =>
  {
    let cashToAdd = Math.floor(params.state.cash / (Math.round(itemUtils.geometricSeries(params.item.level - 1, 0.975, 50, 5))));
    params.state.cash += cashToAdd;
    params.logEntry.message = `+$${cashToAdd}`;
  },
};
