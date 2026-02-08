import { ScanBarcode as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Barcode",
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
    `**On Skip**: adds a **${item.level * 5}%** discount to a random item in the Shop. Discounts can stack, but will not go past 100%.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  afterSkipLecture: (params) =>
  {
    const shop = params.state.shop;

    if (shop.length === 0)
    {
      params.logEntry.message = "No items available for a discount";
      return;
    }

    // Only items that can still receive a discount
    const eligible = shop.filter(it => it.discount < 1);

    if (eligible.length === 0)
    {
      params.logEntry.message = "No item could receive a discount";
      return;
    }

    const chosen = eligible[Math.floor(Math.random() * eligible.length)];

    const discountToAdd = 0.05 * params.item.level;
    const before = chosen.discount;

    chosen.discount = Math.min(chosen.discount + discountToAdd, 1);

    const added = chosen.discount - before;

    params.logEntry.message =
      `+${(added * 100).toFixed(0)}% discount to ${chosen.item.name}`;
  },
};
