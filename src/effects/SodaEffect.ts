import { CupSoda as EffectIcon } from "lucide-react";
import type { EffectData, EffectMeta } from "@/effect";

export const effectData: EffectData = {
  name: "Soda",

  // Dont change
  value: 1,
  id: "",
};

export const effectMeta: EffectMeta = {
  icon: EffectIcon,
  backgroundColor: "#00ff48ff",
  getBadgeText: (effect, state) => `Soda: ${effect.value} E`,
  getDescription: (effect, state) => `Skip this lecture to gain **+${effect.value} E** .`,
};
