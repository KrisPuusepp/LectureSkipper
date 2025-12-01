import { CodeXml as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";

export const itemData: ItemData = {
  name: "Schedule Editor",
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
    `**On Attend**: Guarantees that the next **${item.level}** lectures will be about this course. Can only be used once per block.`,
  getEnabled: (item, state) => !itemUtils.getItemUsedThisBlock(item, state),
};

export const itemBehavior: ItemBehavior = {
  beforeAttendLecture: (params) =>
  {
    if (itemUtils.getItemUsedThisBlock(params.item, params.state)) return;
    itemUtils.setItemUsedThisBlock(params.item, params.state)

    itemUtils.addEffectStacksToCourse(params.state, params.lecture.courseIndex, "Guaranteed", params.item.level);

    params.logEntry.message = `Guaranteed ${params.state.courses[params.lecture.courseIndex].title} for ${params.item.level} lectures`;
  },
};
