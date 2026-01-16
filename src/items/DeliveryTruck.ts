import { Truck as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";
import { weightedRandom } from "@/lib/utils";
import { itemsByRarity } from "@/itemRegistry";

export const itemData: ItemData = {
  name: "Delivery Truck",
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
  {
    let weights = [100, 100 + item.level * 10, 10 + item.level * 10];
    let totalWeight = weights.reduce((a, b) => a + b, 0);
    let chances = weights.map((w) => w / totalWeight);

    return `**On Attend**: Adds a new item to the Shop. This new item has a **${(chances[0] * 100).toFixed(2)}%** chance of being common, a **${(chances[1] * 100).toFixed(2)}%** chance of being rare and a **${(chances[2] * 100).toFixed(2)}%** chance of being legendary.`;
  },
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  afterAttendLecture: (params) =>
  {
    const chosenRarity = weightedRandom([1, 2, 3], [100, 100 + params.item.level * 10, 10 + params.item.level * 10]);

    let cost = 200;
    if (chosenRarity == 1) cost = 200;
    else if (chosenRarity == 2) cost = 1000;
    else if (chosenRarity == 3) cost = 6000;

    // Pick item from chosen rarity using item dropWeight
    const itemWeights = itemsByRarity[chosenRarity].map((i) => i.dropWeight);
    const chosenItem = weightedRandom(itemsByRarity[chosenRarity], itemWeights);

    params.state.shop.push({
      item: itemUtils.createItemInstance(chosenItem),
      price: cost,
      discount: 0,
    });

    params.logEntry.message = `Added ${chosenItem.name} to the Shop`;
  },
};
