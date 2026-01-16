import { Flame as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Flame",
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
    `**On Attend**: Increases the Potential Understanding by **${item.level * 10}%**, multiplied by the current streak, then adds +1 to the lecture streak. If you attend a lecture of a different course while this item is active, the streak will be reset.\n\nCurrent streak: ${item.memory.streak || 0} in ${item.memory.courseTitle || "nothing"}.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  beforeAttendLecture: (params) =>
  {
    if (params.item.memory.courseIndex === undefined || params.item.memory.courseIndex !== params.lecture.courseIndex)
    {
      params.item.memory.streak = 0;
      params.item.memory.courseIndex = params.lecture.courseIndex;
      params.item.memory.courseTitle = params.state.courses[params.lecture.courseIndex].title;
      params.logEntry.message = "Streak started in " + params.state.courses[params.lecture.courseIndex].title;
    }

    let multiplier = params.item.memory.streak || 0;

    let lastUnderstandings = params.lecture.potentialUnderstandings;
    params.lecture.potentialUnderstandings += Math.round(params.lecture.potentialUnderstandings * params.item.level * 10 / 100) * multiplier;
    if (multiplier > 0)
    {
      params.logEntry.message = `Potential ${lastUnderstandings} U → ${params.lecture.potentialUnderstandings} U, +${(multiplier * params.item.level * 10)}%`;
    }

    params.item.memory.streak = (params.item.memory.streak || 0) + 1;
  },
};