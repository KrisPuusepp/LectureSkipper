import { LampDesk as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";
import { itemRegistry, itemsByRarity } from "@/itemRegistry";

export const itemData: ItemData = {
  name: "Desk Lamp",
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
    `**Before Use**: If there is an inactive item to the right of this item in the Inventory, turns that item into a random level **${item.level}** Consumable.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  beforeUse: (params) =>
  {
    let mySlot = itemUtils.itemIDtoSlot(params.item.id, params.state);
    if (mySlot == null) return;
    if (mySlot % 6 != 5)
    {
      // Not at the end of the row, so we can continue
      let targetSlot = mySlot + 1;
      let targetItem = params.state.items[targetSlot];
      if (targetItem != null && params.state.calendarActivatedItemIDs.indexOf(targetItem.id) == -1)
      {
        // There is an item in the next slot, so we can turn it into a consumable

        let newConsumableData = itemsByRarity[0][Math.floor(Math.random() * itemsByRarity[0].length)];
        if (newConsumableData == null) return;

        let newConsumable = itemUtils.createItemInstance(newConsumableData);
        newConsumable.level = params.item.level;
        newConsumable.startingLevel = params.item.level;

        params.state.items[targetSlot] = newConsumable;

        params.logEntry.message = `${targetItem.name} → ${newConsumable.name}`;
      }
    }
  },
};
