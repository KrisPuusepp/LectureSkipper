import { Headphones as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Headphones",
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
    `**On Attend**: Still gain **${(item.level * 30)}%** of the Procrastination Value, despite not skipping.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  beforeAttendLecture: (params) =>
  {
    let gainedP = Math.round(params.lecture.procrastinationValue * params.item.level * 0.3);
    params.state.procrastinations += gainedP;
    params.logEntry.message = `+${gainedP} P`;
  },
};
