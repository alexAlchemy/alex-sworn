<template>
  <form class="pre-roll-form" @submit.prevent="submit">
    <div class="sheet-handle" aria-hidden="true"></div>
    <header>
      <p class="eyebrow">Ask the Oracle</p>
      <h2>Choose odds</h2>
    </header>

    <ion-radio-group v-model="likelihood" class="odds-list">
      <label v-for="option in odds" :key="option.id" class="odds-option">
        <ion-radio :value="option.id" />
        <span>{{ option.label }}</span>
      </label>
    </ion-radio-group>

    <ion-button expand="block" type="submit">Roll</ion-button>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { IonButton, IonRadio, IonRadioGroup } from '@ionic/vue';
import type { AskOraclePayload, RollableTable } from '../../data/oracles';

const props = defineProps<{
  table: RollableTable;
}>();

const emit = defineEmits<{
  submit: [payload: AskOraclePayload];
}>();

const odds = computed(() => (props.table.kind === 'ask-oracle' ? props.table.odds : []));
const likelihood = ref('fifty-fifty');

const submit = () => {
  emit('submit', {
    likelihood: likelihood.value
  });
};
</script>

<style scoped>
.pre-roll-form {
  display: grid;
  gap: 12px;
  padding: 10px 12px 24px;
}

.sheet-handle {
  background: #b8ad9c;
  border-radius: 999px;
  height: 4px;
  justify-self: center;
  width: 44px;
}

header {
  display: grid;
  gap: 4px;
  padding: 0 8px;
}

.eyebrow,
h2 {
  margin: 0;
}

.eyebrow {
  color: #56616a;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

h2 {
  color: #1d252c;
  font-size: 1.2rem;
}

.odds-list {
  display: grid;
  gap: 8px;
}

.odds-option {
  align-items: center;
  background: #fffaf1;
  border: 1px solid #dacdbb;
  border-radius: 8px;
  color: #1d252c;
  display: flex;
  font-weight: 700;
  gap: 10px;
  min-height: 42px;
  padding: 8px 12px;
}
</style>
