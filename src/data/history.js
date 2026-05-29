import { readonly, ref } from 'vue';
const recentRolls = ref([]);
export const useRollHistory = () => {
    const addRoll = (table, result) => {
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
