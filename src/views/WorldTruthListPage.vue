<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button aria-label="Open menu" />
        </ion-buttons>
        <ion-title>World Truths</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <main class="truth-list-shell">
        <ion-searchbar v-model="search" placeholder="Find a truth" inputmode="search" :debounce="120" />

        <section v-if="filteredTruths.length" class="truth-list">
          <button
            v-for="truth in filteredTruths"
            :key="truth.id"
            type="button"
            class="truth-row"
            @click="openTruth(truth.id)"
          >
            <span>
              <strong>{{ truth.title }}</strong>
              <small>{{ systemLabels[truth.system] }} / {{ truth.options.length }} options</small>
            </span>
            <ion-icon :icon="chevronForward" aria-hidden="true" />
          </button>
        </section>

        <section v-else class="empty-state">
          <h1>No world truths</h1>
          <p>{{ systemLabels[selectedSystem] }} world truths are not available in the current data set.</p>
        </section>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import { chevronForward } from 'ionicons/icons';
import { systemLabels } from '../data/oracles';
import { useOracleSettings } from '../data/settings';
import { worldTruths } from '../data/truths';

const router = useRouter();
const search = ref('');
const { selectedSystem } = useOracleSettings();

const filteredTruths = computed(() => {
  const query = search.value.trim().toLowerCase();

  return worldTruths.filter((truth) => {
    const matchesSystem = truth.system === selectedSystem.value;
    const matchesQuery =
      !query ||
      truth.title.toLowerCase().includes(query) ||
      truth.options.some((option) => option.result.toLowerCase().includes(query));

    return matchesSystem && matchesQuery;
  });
});

const openTruth = (id: string) => {
  router.push({ name: 'WorldTruthDetail', params: { id } });
};
</script>

<style scoped>
.truth-list-shell {
  display: grid;
  gap: 12px;
  margin: 0 auto;
  max-width: 820px;
  padding: 14px 14px 32px;
}

.truth-list {
  display: grid;
  gap: 8px;
}

.truth-row {
  align-items: center;
  background: #fffaf1;
  border: 1px solid #dacdbb;
  border-radius: 8px;
  color: #1d252c;
  display: flex;
  font: inherit;
  justify-content: space-between;
  min-height: 58px;
  padding: 10px 12px;
  text-align: left;
  width: 100%;
}

.truth-row span {
  display: grid;
  gap: 4px;
}

.truth-row strong {
  font-size: 1rem;
}

.truth-row small {
  color: #56616a;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

.empty-state {
  background: #fffaf1;
  border: 1px solid #dacdbb;
  border-radius: 8px;
  display: grid;
  gap: 8px;
  padding: 16px;
}

.empty-state h1,
.empty-state p {
  margin: 0;
}

.empty-state h1 {
  color: #1d252c;
  font-size: 1.2rem;
}

.empty-state p {
  color: #3f4a52;
  line-height: 1.4;
}

ion-content {
  --background: #f7f2e8;
}

ion-searchbar {
  --background: #fffaf1;
  --border-radius: 8px;
  padding-inline: 0;
}
</style>
