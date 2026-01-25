import { Coffee as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "Coffee",
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
    `**Consumable**: Gain Energy equivalent to **${Math.min((20 + item.level * 10), 100)}%** of your maximum. Note that energy cannot go above the maximum.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  beforeUse: (params) =>
  {
    params.logEntry.message = `${params.state.energy} E → `;
    params.state.energy += Math.ceil((20 + params.item.level * 10) / 100 * params.state.maxEnergy);
    params.state.energy = Math.min(params.state.energy, params.state.maxEnergy);
    params.logEntry.message += `${params.state.energy} E`;

    // Delete self
    itemUtils.destroyItemWithID(params.item.id, params.state);
  },
};
