import { Bug as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Bug",
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
    `**On Attend**: Increases the Potential Understanding by **${item.level * 10}%**, but all gained Understandings instead go to a random course.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  beforeAttendLecture: (params) =>
  {
    let lastUnderstandings = params.lecture.potentialUnderstandings;
    params.lecture.potentialUnderstandings += Math.round(params.lecture.potentialUnderstandings * params.item.level * 10 / 100);
    params.logEntry.message = `Potential ${lastUnderstandings} U → ${params.lecture.potentialUnderstandings} U`;
  },
  afterAttendLecture: (params) =>
  {
    if (params.result.result == "success")
    {
      let gainedUnderstandings = params.result.gainedUnderstandings;

      // Remove the understandings that were gained so that they can be given to another course
      params.state.courses[params.lecture.courseIndex].understandings -= params.result.gainedUnderstandings;

      // Prevent other items from using gainedUnderstandings
      params.result.gainedUnderstandings = 0;

      let randomCourseIndex = Math.floor(Math.random() * params.state.courses.length);
      let randomCourse = params.state.courses[randomCourseIndex];
      randomCourse.understandings += gainedUnderstandings;

      params.logEntry.message = `Gave +${gainedUnderstandings} U to ${randomCourse.title}`;
    }
  },
};