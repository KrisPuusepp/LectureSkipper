import { Printer as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Printer",
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
    `**Always Active**: Gain +$1 for every level of the **${item.level}** highest level items you have, up to **+$${item.level * 10}** per item.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  beforeRound: (params) =>
  {
    // List item levels (highest → lowest)
    const itemLevels = params.state.items
      .filter((it) => it !== null)          // remove nulls
      .map((it) => it!.level)               // extract levels
      .sort((a, b) => b - a);               // descending

    let totalLevels = 0;
    for (let i = 0; i < itemLevels.length && i < params.item.level; i++)
    {
      totalLevels += Math.min(itemLevels[i], params.item.level * 10);
    }

    params.state.cash += totalLevels;
    params.logEntry.message = `+$${totalLevels}`;
  },
};
