import { Gem as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Gem",
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
    `**Always Active**:  After a lecture, gain **+$${item.level * 250 + 750}**.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  afterRound: (params) => {
    params.state.cash += params.item.level * 250 + 750;
    params.logEntry.message = `+$${params.item.level * 250 + 750}`;
  },
};
