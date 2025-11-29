import { Apple as ItemIcon } from "lucide-react";
import type { ItemData, ItemMeta, ItemBehavior, itemUtils } from "@/item";

export const itemData: ItemData = {
  name: "Apple",
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
    `**On Attend**: increase your max energy by **${item.level} E**.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  beforeAttendLecture: (params) => {
    params.state.maxEnergy += params.item.level;
    params.logEntry.message = `Max energy +${params.item.level} E`;
  },
};
