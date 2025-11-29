import { Pizza as ItemIcon } from "lucide-react";
import type { ItemData, ItemMeta, ItemBehavior, itemUtils } from "@/item";

export const itemData: ItemData = {
  name: "Pizza",
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
    `**On Attend**: lose **${(getFraction(item.level) * 100).toFixed(2)}%** less energy from that lecture.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  beforeAttendLecture: (params) =>
  {
    let lastEnergy = params.lecture.energyCost;
    params.lecture.energyCost = Math.round((1 - getFraction(params.item.level)) * params.lecture.energyCost);
    params.logEntry.message = `Energy Cost ${lastEnergy} E → ${params.lecture.energyCost} E`;
  },
};

function getFraction(step: number): number
{
  return 0.5 * (1 - Math.pow(0.5, step));
}
