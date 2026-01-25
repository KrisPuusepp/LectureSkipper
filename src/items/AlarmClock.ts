import { AlarmClock as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Alarm Clock",
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
    `**After Attend**: Activates the item for the next 10 seconds, during which the Potential Understanding of all lectures is increased by **${item.level * 20}%**. Can only be used once per block.`,
  getEnabled: (item, state) => !itemUtils.getItemUsedThisBlock(item, state),
};

export const itemBehavior: ItemBehavior = {
  afterAttendLecture: (params) =>
  {
    itemUtils.setItemUsedThisBlock(params.item, params.state);

    params.item.memory.endTime = new Date().getTime() + 10000;

    params.logEntry.message = `Timer Activated`;
  },
  beforeRound: (params) =>
  {
    if (params.item.memory.endTime === undefined)
      return;

    if (new Date().getTime() > params.item.memory.endTime)
      return;

    let secondsLeft = ((params.item.memory.endTime - new Date().getTime()) / 1000);

    let lastUnderstandings = params.lecture.potentialUnderstandings;
    params.lecture.potentialUnderstandings += Math.round(params.lecture.potentialUnderstandings * params.item.level * 20 / 100);
    params.logEntry.message = `${secondsLeft.toFixed(2)}s left, Potential ${lastUnderstandings} U → ${params.lecture.potentialUnderstandings} U`;
  },
};