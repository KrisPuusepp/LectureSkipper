import type { GameState, Lecture, LectureResult, LogEntry } from "@/game";
import type { LucideIcon } from "lucide-react";
import { generateUUID } from "@/game";

export type ItemData = {
  // Set randomly when the item is made
  id: string;
  name: string;
  rarity: number;
  dropWeight: number;
  level: number;
  startingLevel: number;
  // Used by items to keep track of their functionality throughout the game
  memory: any;
};

// Non-serializable item metadata (icon, dynamic description, etc.)
export type ItemMeta = {
  icon: LucideIcon;
  getDescription: (item: ItemData) => string;
  getEnabled: (item: ItemData, state: GameState) => boolean;
};

export type BeforeHookParams = {
  state: GameState;
  item: ItemData;
  lecture: Lecture;
  logEntry: LogEntry;
};

export type AfterHookParams = {
  state: GameState;
  item: ItemData;
  lecture: Lecture;
  logEntry: LogEntry;

  result: LectureResult;
  nextLecture: Lecture | null;
};

export type ItemBehavior = Partial<{
  beforeAttendLecture: (params: BeforeHookParams) => void;
  afterAttendLecture: (params: AfterHookParams) => void;
  beforeSkipLecture: (params: BeforeHookParams) => void;
  afterSkipLecture: (params: AfterHookParams) => void;
  beforeUse: (params: BeforeHookParams) => void;
  afterUse: (params: AfterHookParams) => void;
  beforeRound: (params: BeforeHookParams) => void;
  afterRound: (params: AfterHookParams) => void;
}>;

export const itemUtils = {
  setItemUsedThisBlock: (item: ItemData, state: GameState) =>
  {
    item.memory["lastUsed"] = state.block;
  },
  getItemUsedThisBlock: (item: ItemData, state: GameState): boolean =>
  {
    return item.memory.hasOwnProperty("lastUsed") && item.memory.lastUsed === state.block;
  },

  createItemInstance: (data: ItemData): ItemData =>
  {
    const newItem: ItemData = {
      ...data,
      id: generateUUID(),
      memory: {},
    };
    return newItem;
  },

  /**
   * Fails if there are no free slots in the inventory.
   * @returns Whether or not the item was successfully added.
   */
  createItemInstanceAndAddToInventory: (data: ItemData, state: GameState): boolean =>
  {
    let freeSlot = -1;
    for (let i = 0; i < state.items.length; i++)
    {
      if (state.items[i] === null)
      {
        freeSlot = i;
        break;
      }
    }

    if (freeSlot === -1)
      return false;

    const newItem = itemUtils.createItemInstance(data);

    state.items[freeSlot] = newItem;

    return true;
  },
  addEffectStacksToCourse: (state: GameState, courseIndex: number, effect: string, amount: number): number =>
  {
    if (state.courses[courseIndex].effects.hasOwnProperty(effect) == false)
      state.courses[courseIndex].effects[effect] = 0;
    state.courses[courseIndex].effects[effect] += amount;
    if (state.courses[courseIndex].effects[effect] == 0)
      delete state.courses[courseIndex].effects[effect];
    return state.courses[courseIndex].effects[effect];
  },
  getEffectStacks: (state: GameState, courseIndex: number, effect: string): number =>
  {
    if (state.courses[courseIndex].effects.hasOwnProperty(effect) == false)
      return 0;
    return state.courses[courseIndex].effects[effect];
  },
};