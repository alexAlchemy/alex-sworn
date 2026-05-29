<template>
  <form class="pre-roll-form" @submit.prevent="submit">
    <div class="sheet-handle" aria-hidden="true"></div>
    <header>
      <p class="eyebrow">Action Roll</p>
      <h2>Set modifier</h2>
    </header>

    <section class="modifier-block">
      <p>Penalty</p>
      <div class="modifier-grid">
        <button
          v-for="value in penalties"
          :key="value"
          type="button"
          class="modifier-button penalty"
          :class="{ active: modifier === value }"
          @click="modifier = value"
        >
          {{ value }}
        </button>
      </div>
    </section>

    <section class="modifier-block">
      <p>Bonus</p>
      <div class="modifier-grid">
        <button
          v-for="value in bonuses"
          :key="value"
          type="button"
          class="modifier-button bonus"
          :class="{ active: modifier === value }"
          @click="modifier = value"
        >
          +{{ value }}
        </button>
      </div>
    </section>

    <ion-button expand="block" type="submit">Roll</ion-button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton } from '@ionic/vue';
import type { ActionRollPayload } from '../../data/oracles';

const emit = defineEmits<{
  submit: [payload: ActionRollPayload];
}>();

const modifier = ref(0);
const penalties = [-6, -5, -4, -3, -2, -1, 0];
const bonuses = [0, 1, 2, 3, 4, 5, 6];

const submit = () => {
  emit('submit', {
    modifier: Number(modifier.value) || 0
  });
};
</script>

<style scoped>
.pre-roll-form {
  display: grid;
  gap: 12px;
  padding: 10px 12px 20px;
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

.modifier-block {
  display: grid;
  gap: 6px;
}

.modifier-block p {
  color: #56616a;
  font-size: 0.8rem;
  font-weight: 700;
  margin: 0;
  padding-inline: 4px;
  text-transform: uppercase;
}

.modifier-grid {
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.modifier-button {
  align-items: center;
  aspect-ratio: 1;
  background: #fffaf1;
  border: 1px solid #dacdbb;
  border-radius: 8px;
  color: #1d252c;
  display: inline-flex;
  font: inherit;
  font-weight: 800;
  justify-content: center;
  min-width: 0;
}

.modifier-button.penalty {
  background: #fff4ef;
  border-color: #d9a08a;
}

.modifier-button.bonus {
  background: #eef7f1;
  border-color: #8bb99e;
}

.modifier-button.penalty.active {
  background: #9b4d38;
  border-color: #9b4d38;
  color: #fffaf1;
}

.modifier-button.bonus.active {
  background: #2f604f;
  border-color: #2f604f;
  color: #fffaf1;
}
</style>
