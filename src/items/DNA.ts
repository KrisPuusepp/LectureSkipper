import { Dna as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";
import { itemRegistry } from "@/itemRegistry";

export const itemData: ItemData = {
  name: "DNA",
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
    `**Consumable**: Turns into a copy of the item that is directly to the right of this one. Also adds the levels from the copied item to this one.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  afterUse: (params) =>
  {
    let mySlot = itemUtils.itemIDtoSlot(params.item.id, params.state);
    if (mySlot == null) return;
    if (mySlot % 6 != 5)
    {
      // Not at the end of the row, so we can continue
      let targetSlot = mySlot + 1;
      let targetItem = params.state.items[targetSlot];
      if (targetItem != null)
      {
        // There is an item in the next slot, so we can turn into it

        // Delete self
        itemUtils.destroyItemWithID(params.item.id, params.state);

        // Turn into the target item
        let newItem = itemUtils.createItemInstance(itemRegistry[targetItem.name]);
        newItem.level += targetItem.level;
        newItem.startingLevel = targetItem.startingLevel;
        newItem.memory = structuredClone(targetItem.memory);
        params.state.items[mySlot] = newItem;

        params.logEntry.message = `Turned into ${newItem.name}`;
      }
    }
  },
};