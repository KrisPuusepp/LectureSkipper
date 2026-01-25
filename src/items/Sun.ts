import { Sun as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Sun",
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
    `**Always Active**: Whenever a lecture appears, immediately gain **+${item.level * 2 + 3}** Understanding in that course.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  afterRound: (params) =>
  {
    if (params.nextLecture == null) return;
    params.state.courses[params.nextLecture.courseIndex].understandings += params.item.level * 2 + 3;
    params.logEntry.message = `+${params.item.level * 2 + 3} U in ${params.state.courses[params.nextLecture.courseIndex].title}`;
  },
};
