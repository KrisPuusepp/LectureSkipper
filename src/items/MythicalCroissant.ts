import { Croissant as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Mythical Croissant",
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
    `**On Attend**: Permanently increases the amount of energy restored when skipping a lecture by **+${item.level * 3} E**.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  beforeAttendLecture: (params) => {
    let lastEnergyPerSkip = params.state.energyPerSkip;
    params.state.energyPerSkip += params.item.level * 3;
    params.logEntry.message = `E per skip ${lastEnergyPerSkip} → ${params.state.energyPerSkip}`;
  },
};
