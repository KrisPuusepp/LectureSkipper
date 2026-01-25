import { Beer as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";
import { itemRegistry } from "@/itemRegistry";

export const itemData: ItemData = {
  name: "Epic Beer",
  rarity: 3,
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
    `**On Attend**: Gives you one level **${Math.floor(item.level / 3) + 2}** Master Professor item.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  beforeAttendLecture: (params) =>
  {
    let newItem = itemUtils.createItemInstanceAndAddToInventory(itemRegistry["Master Professor"], params.state);
    if (newItem === false) return;
    newItem.level = Math.floor(params.item.level / 3) + 2;
    params.logEntry.message = `+1 Master Professor`;
  },
};

