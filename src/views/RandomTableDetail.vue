<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tables" text="" />
        </ion-buttons>
        <ion-title>{{ table?.title ?? 'Table' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <main v-if="table" class="table-detail-shell">
        <header class="detail-heading">
          <p>{{ systemLabels[table.system] }} / {{ table.category }}</p>
          <h1>{{ table.title }}</h1>
          <div v-if="table.description" class="description">
            {{ table.description }}
          </div>
        </header>

        <section class="range-list">
          <article v-for="row in rows" :key="row.key" class="range-row">
            <strong>{{ row.range }}</strong>
            <p>{{ row.result }}</p>
          </article>
        </section>
      </main>

      <main v-else class="table-detail-shell">
        <section class="empty-state">
          <h1>Table not found</h1>
          <ion-button router-link="/tables" router-direction="root">Back to Tables</ion-button>
        </section>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import { findRandomTable, systemLabels } from '../data/oracles';

const route = useRoute();
const table = computed(() => findRandomTable(String(route.params.id)));

const rows = computed(() => {
  const currentTable = table.value;

  if (!currentTable) {
    return [];
  }

  if (currentTable.kind === 'ask-oracle') {
    return currentTable.odds.map((option) => ({
      key: option.id,
      range: option.label,
      result: option.yes.map((entry) => `Yes on ${formatRange(entry.min, entry.max)}`).join(', ')
    }));
  }

  return currentTable.entries.map((entry) => ({
    key: `${entry.min}-${entry.max}-${entry.result}`,
    range: formatRange(entry.min, entry.max),
    result: entry.result
  }));
});

const formatRange = (min: number, max: number) => (min === max ? `${min}` : `${min}-${max}`);
</script>

<style scoped>
.table-detail-shell {
  display: grid;
  gap: 16px;
  margin: 0 auto;
  max-width: 820px;
  padding: 18px 14px 36px;
}

.detail-heading {
  display: grid;
  gap: 6px;
}

.detail-heading p {
  color: #56616a;
  font-size: 0.78rem;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
}

h1 {
  color: #1d252c;
  font-size: 1.8rem;
  margin: 0;
}

.description {
  background: #fffaf1;
  border: 1px solid #dacdbb;
  border-radius: 8px;
  color: #3f4a52;
  line-height: 1.45;
  margin-top: 6px;
  padding: 12px;
}

.range-list {
  border: 1px solid #dacdbb;
  border-radius: 8px;
  overflow: hidden;
}

.range-row {
  background: #fffaf1;
  display: grid;
  gap: 8px;
  grid-template-columns: 78px 1fr;
  padding: 10px 12px;
}

.range-row + .range-row {
  border-top: 1px solid #dacdbb;
}

.range-row strong {
  color: #2f604f;
  font-size: 0.95rem;
}

.range-row p {
  color: #1d252c;
  line-height: 1.35;
  margin: 0;
}

.empty-state {
  display: grid;
  gap: 14px;
  padding-top: 42px;
}

ion-content {
  --background: #f7f2e8;
}
</style>
