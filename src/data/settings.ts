import { readonly, ref } from 'vue';
import type { OracleSystem } from './oracles';

export type CoreOracleSystem = Exclude<OracleSystem, 'custom'>;

const selectedSystem = ref<CoreOracleSystem>('ironsworn');
const includeCustom = ref(false);

export const useOracleSettings = () => {
  const setSelectedSystem = (system: CoreOracleSystem) => {
    selectedSystem.value = system;
  };

  const setIncludeCustom = (include: boolean) => {
    includeCustom.value = include;
  };

  return {
    selectedSystem: readonly(selectedSystem),
    includeCustom: readonly(includeCustom),
    setSelectedSystem,
    setIncludeCustom
  };
};
