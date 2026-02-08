import { Car as EffectIcon } from "lucide-react";
import type { EffectData, EffectMeta } from "@/effect";

export const effectData: EffectData = {
  name: "TravelCost",

  // Dont change
  value: 1,
  id: "",
};

export const effectMeta: EffectMeta = {
  icon: EffectIcon,
  backgroundColor: "#2d790aff",
  getBadgeText: (effect, state) => `Travel Cost: $${effect.value}`,
  getDescription: (effect, state) => `On Attend, lose **$${effect.value}**. Does not stop you from attending, as long as you still have Energy. Your balance cannot go into the negatives.`,
};
