import { ToolCase as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Toolbox",
  rarity: 1,
  dropWeight: 50,

  // Don't change
  level: 1,
  startingLevel: 1,
  memory: {},
  id: "",
};

export const itemMeta: ItemMeta = {
  icon: ItemIcon,
  getDescription: (item) =>
    `**Consumable**: Increases the starting level of a random item in the shop by **${item.level * 3}**.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  afterUse: (params) =>
  {
    if (params.state.shop.length == 0) return;

    const randomIndex = Math.floor(Math.random() * params.state.shop.length);

    params.logEntry.message = `${params.state.shop[randomIndex].item.name}: Level ${params.state.shop[randomIndex].item.level} →`;

    params.state.shop[randomIndex].item.level += params.item.level * 3;
    params.state.shop[randomIndex].item.startingLevel += params.item.level * 3;

    params.logEntry.message += ` Level ${params.state.shop[randomIndex].item.level}`;

    // Delete self
    itemUtils.destroyItemWithID(params.item.id, params.state);
  },
};
