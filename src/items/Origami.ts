import { Origami as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Origami",
  rarity: 0,
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
    `**Consumable**: Increase your current amount of Procrastinations by **${item.level * 4}%**.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  beforeUse: (params) =>
  {
    params.logEntry.message = `Procrastinations ${params.state.procrastinations} P →`;
    params.state.procrastinations += Math.round(params.state.procrastinations * (params.item.level * 0.04));
    params.logEntry.message += ` ${params.state.procrastinations} P`;
    
    // Delete self
    itemUtils.destroyItemWithID(params.item.id, params.state);
  },
};
