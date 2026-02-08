import { Gamepad as EffectIcon } from "lucide-react";
import type { EffectData, EffectMeta } from "@/effect";

export const effectData: EffectData = {
  name: "TakesP",

  // Dont change
  value: 1,
  id: "",
};

export const effectMeta: EffectMeta = {
  icon: EffectIcon,
  backgroundColor: "#1e7888ff",
  getBadgeText: (effect, state) => `Takes P: ${effect.value} P`,
  getDescription: (effect, state) => `On Attend, lose **${effect.value} P**. Does not stop you from attending, as long as you still have Energy. Your Procrastinations cannot go into the negatives.`,
};
