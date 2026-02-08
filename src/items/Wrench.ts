import { Wrench as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Wrench",
  rarity: 0,
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
    `**Consumable**: Evenly distributes all of its levels across every other item in the inventory.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  afterUse: (params) =>
  {
    const allItems = params.state.items.filter(
      (it): it is ItemData => it !== null && it.id !== params.item.id
    );

    if (allItems.length === 0) return;

    const totalLevels = params.item.level;
    const itemCount = allItems.length;

    // Base distribution
    const base = Math.floor(totalLevels / itemCount);
    let remainder = totalLevels % itemCount;

    // Give everyone the base amount
    for (const it of allItems)
    {
      it.level += base;
    }

    // Randomly distribute the remainder
    // Fisher–Yates style shuffle of indices
    for (let i = allItems.length - 1; i > 0 && remainder > 0; i--)
    {
      const j = Math.floor(Math.random() * (i + 1));
      [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
    }

    for (let i = 0; i < remainder; i++)
    {
      allItems[i].level += 1;
    }

    params.logEntry.message =
      `Distributed ${totalLevels} level${totalLevels === 1 ? "" : "s"}`;

    // Delete self
    itemUtils.destroyItemWithID(params.item.id, params.state);
  },
};
