import { Cookie as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";

export const itemData: ItemData = {
  name: "Cookie",
  rarity: 1,
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
    `**On Use**: Has a **${Math.min(item.level * 10, 100)}%** chance of giving you a Level **${item.level}** Cookie. Going over 100% can give you more cookies per use.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  beforeUse: (params) =>
  {
    let chanceLeft = params.item.level * 10 / 100;
    while (true)
    {
      let cookie = Math.random() < chanceLeft;
      if (cookie)
      {
        chanceLeft -= 1;

        if (!itemUtils.createItemInstanceAndAddToInventory(params.item, params.state))
          return;
      }
      else break;
    }
  },
};

