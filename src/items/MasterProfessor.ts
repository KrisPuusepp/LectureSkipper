import { GraduationCap as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Master Professor",
  rarity: 3,
  dropWeight: 0,

  // Don't change
  level: 1,
  startingLevel: 1,
  memory: {},
  id: "",
};

export const itemMeta: ItemMeta = {
  icon: ItemIcon,
  getDescription: (item) =>
    `Can only be acquired by using an Epic Beer.\n**Consumable**: Gives you **${item.level}**^n Understandings for this course, where n is the amount of currently activated Master Professors.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  beforeUse: (params) =>
  {
    let nonNullItems: ItemData[] = params.state.items.filter((it) => it != null);
    let professors: ItemData[] = nonNullItems.filter((it) => it.name == "Master Professor");
    let selectedProfessors: ItemData[] = professors.filter((it) => params.state.calendarActivatedItemIDs.indexOf(it.id) != -1);

    // Only the first one activates
    if (selectedProfessors[0].id == params.item.id)
    {
      params.state.courses[params.lecture.courseIndex].understandings += params.item.level ** selectedProfessors.length;
      params.logEntry.message = `+${params.item.level ** selectedProfessors.length} U in ${params.state.courses[params.lecture.courseIndex].title}`;
    }
  },
  afterUse: (params) =>
  {
    // Delete self
    itemUtils.destroyItemWithID(params.item.id, params.state);
  },
};
