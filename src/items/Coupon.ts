import { TicketPercent as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Coupon",
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
    `**Consumable**: Add a **${Math.min(item.level * 5, 100)}%** discount to every item in the Shop. Discounts can stack, but will not go past 100%.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  afterUse: (params) =>
  {
    let addedDiscounts = 0;
    for (let i = 0; i < params.state.shop.length; i++)
    {
      if (params.state.shop[i].discount < 1)
      {
        params.state.shop[i].discount = Math.min(params.state.shop[i].discount + (params.item.level * 5) / 100, 1);
        addedDiscounts++;
      }
    }
    params.logEntry.message = `Added ${addedDiscounts} discount${addedDiscounts == 1 ? "" : "s"}`;

    // Delete self
    itemUtils.destroyItemWithID(params.item.id, params.state);
  },
};
