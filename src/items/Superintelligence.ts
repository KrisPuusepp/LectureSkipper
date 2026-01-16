import { BrainCircuit as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Superintelligence",
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
    `**After Attend**: All other courses also gain **${(itemUtils.geometricSeries(item.level - 1, 0.95, 0.1, 1) * 100).toFixed(2)}%** of the gained Understandings from this lecture.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  afterAttendLecture: (params) =>
  {
    if (params.result.result == "success")
    {
      let understandingsToAdd = params.result.gainedUnderstandings;
      understandingsToAdd *= itemUtils.geometricSeries(params.item.level - 1, 0.95, 0.1, 1);
      understandingsToAdd = Math.round(understandingsToAdd);

      for (let i = 0; i < params.state.courses.length; i++)
      {
        if (i != params.lecture.courseIndex)
        {
          params.state.courses[i].understandings += understandingsToAdd;
        }
      }

      params.logEntry.message = `Gave +${understandingsToAdd} U to ${params.state.courses.length - 1} courses`;
    }
  },
};