import { Wrench as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Wrench",
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
    `**Consumable**: Randomly distributes all of its levels across every other item in the inventory.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  afterUse: (params) =>
  {
    // Get a list of all available items
    let nonNullitems: ItemData[] = params.state.items.filter((it) => it !== null);
    let items: ItemData[] = nonNullitems.filter((it) => it.id != params.item.id);
    if(items.length == 0) return;

    for (let i = 0; i < params.item.level; i++)
    {
      const randomIndex = Math.floor(Math.random() * items.length);
      items[randomIndex].level++;;
    }

    params.logEntry.message = `Distributed ${params.item.level} level${params.item.level == 1 ? "" : "s"}`;

    // Delete self
    itemUtils.destroyItemWithID(params.item.id, params.state);
  },
};
