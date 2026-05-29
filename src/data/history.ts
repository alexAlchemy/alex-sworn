import { readonly, ref } from 'vue';
import type { RollableTable, RollResult } from './oracles';

export interface RecentRoll {
  id: string;
  table: RollableTable;
  result: RollResult;
  createdAt: Date;
}

const recentRolls = ref<RecentRoll[]>([]);

export const useRollHistory = () => {
  const addRoll = (table: RollableTable, result: RollResult) => {
    recentRolls.value = [
      {
        id: `${table.id}-${Date.now()}`,
        table,
        result,
        createdAt: new Date()
      },
      ...recentRolls.value
    ].slice(0, 50);
  };

  const clearHistory = () => {
    recentRolls.value = [];
  };

  return {
    recentRolls: readonly(recentRolls),
    addRoll,
    clearHistory
  };
};
