<template>
  <form class="pre-roll-form" @submit.prevent="submit">
    <div class="sheet-handle" aria-hidden="true"></div>
    <header>
      <p class="eyebrow">Action Roll</p>
      <h2>Set modifier</h2>
    </header>

    <ion-item>
      <ion-input
        v-model.number="modifier"
        label="Modifier"
        label-placement="stacked"
        type="number"
        inputmode="numeric"
      />
    </ion-item>

    <ion-button expand="block" type="submit">Roll</ion-button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonInput, IonItem } from '@ionic/vue';
import type { ActionRollPayload } from '../../data/oracles';

const emit = defineEmits<{
  submit: [payload: ActionRollPayload];
}>();

const modifier = ref(0);

const submit = () => {
  emit('submit', {
    modifier: Number(modifier.value) || 0
  });
};
</script>

<style scoped>
.pre-roll-form {
  display: grid;
  gap: 14px;
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
</style>
