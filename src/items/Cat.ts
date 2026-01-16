import { Cat as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";
import { shuffle } from "@/lib/utils";

export const itemData: ItemData = {
  name: "Cat",
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
    `**Always Active**: If this item is at the top right of the inventory, it will activate and start to move on its own. Every lecture, it will move into a random adjacent (horizontally or vertically) free slot. If it reaches the bottom left corner, it disappears and you gain **${item.level * 500} P** and **$${item.level * 500}**. If you manually move it before it reaches its destination, it becomes deactivated.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  beforeRound: (params) =>
  {
    let mySlot = itemUtils.itemIDtoSlot(params.item.id, params.state);

    if (params.item.memory.lastSlot === undefined) params.item.memory.lastSlot = itemUtils.itemToSlot(params.item, params.state);
    if (params.item.memory.moving === undefined) params.item.memory.moving = false;

    if (params.item.memory.moving && params.item.memory.lastSlot != mySlot)
    {
      // Stop moving
      params.item.memory.moving = false;
      params.item.memory.lastSlot = mySlot;
      params.logEntry.message = "Stopped moving";
      return;
    }
    if (params.item.memory.moving == false && mySlot == 5)
    {
      // Start moving
      params.item.memory.moving = true;
      params.item.memory.lastSlot = mySlot;
    }

    // The rest of the code is only for when we are moving
    if (params.item.memory.moving != true)
      return;

    let directions = ["up", "down", "left", "right"];
    shuffle(directions);

    // Try directions until we can successfully move
    for (let i = 0; i < directions.length; i++)
    {
      let direction = directions[i];
      let successful = true;
      let newSlot = mySlot;

      switch (direction)
      {
        case "up":
          if (mySlot < 6)
          {
            successful = false;
            break;
          }
          newSlot -= 6;
          break;
        case "down":
          if (mySlot >= params.state.items.length - 6)
          {
            successful = false;
            break;
          }
          newSlot += 6;
          break;
        case "left":
          if (mySlot % 6 == 0)
          {
            successful = false;
            break;
          }
          newSlot -= 1;
          break;
        case "right":
          if (mySlot % 6 == 5)
          {
            successful = false;
            break;
          }
          newSlot += 1;
          break;
      }

      if (!successful) continue;
      if (params.state.items[newSlot] != null) continue;

      // Move to new slot
      params.item.memory.lastSlot = newSlot;
      params.state.items[newSlot] = params.state.items[mySlot];
      params.state.items[mySlot] = null;
      params.logEntry.message = `Meow!`;

      // Check if we are at the bottom left corner of the inventory
      if (newSlot == 30)
      {
        params.state.procrastinations += params.item.level * 500;
        params.state.cash += params.item.level * 500;
        params.logEntry.message += ` +${params.item.level * 500} P and $${params.item.level * 500}`;

        // Delete self
        itemUtils.destroyItemWithID(params.item.id, params.state);
      }

      return;
    }
  },
};
