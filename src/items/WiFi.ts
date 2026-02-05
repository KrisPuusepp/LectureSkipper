import { Wifi as ItemIcon } from "lucide-react";
import { type ItemData, type ItemMeta, type ItemBehavior, itemUtils } from "@/item";
import { effectUtils } from "@/effect";

export const itemData: ItemData = {
  name: "WiFi",
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
    `**On Skip**: Increase the Cash rewards of all chats in the Group Chat by **+$${item.level * 30}**.`,
  getEnabled: (item, state) => true,
};

export const itemBehavior: ItemBehavior = {
  beforeSkipLecture: (params) =>
  {
    let increasedCount = 0;
    let increaseAmount = params.item.level * 30;
    for (let i = 0; i < params.state.quests.length; i++)
    {
      let quest = params.state.quests[i];
      let countedThisQuest = false;
      for (let j = 0; j < quest.rewards.length; j++)
      {
        if (quest.rewards[j].type == "cash")
        {
          quest.rewards[j].amount = quest.rewards[j].amount + increaseAmount;
          if (countedThisQuest == false)
          {
            increasedCount++;
            countedThisQuest = true;
          }
        }
      }
    }

    params.logEntry.message = `Increased the $ rewards of ${increasedCount} chat${increasedCount == 1 ? "" : "s"}.`;
  },
};
