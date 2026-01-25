import { Moon as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "All-Nighter",
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
    `**After Skip**: Sets your Energy to 0, but permanently increases the amount of understandings that lectures of this course give by **+${item.level * 10}%**.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  afterSkipLecture: (params) =>
  {
    effectUtils.addEffectStacksToCourse(params.state, params.lecture.courseIndex, "Prepared", params.item.level * 10);

    params.logEntry.message = `Permanent +${params.item.level * 10}% U, but ${params.state.energy} E → 0 E`;

    params.state.energy = 0;
  },
};