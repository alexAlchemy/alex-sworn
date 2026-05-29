import { readonly, ref } from 'vue';
const selectedSystem = ref('ironsworn');
const includeCustom = ref(false);
export const useOracleSettings = () => {
    const setSelectedSystem = (system) => {
        selectedSystem.value = system;
    };
    const setIncludeCustom = (include) => {
        includeCustom.value = include;
    };
    return {
        selectedSystem: readonly(selectedSystem),
        includeCustom: readonly(includeCustom),
        setSelectedSystem,
        setIncludeCustom
    };
};
