<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button aria-label="Open menu" />
        </ion-buttons>
        <ion-title>Tables</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <main class="table-list-shell">
        <ion-searchbar v-model="search" placeholder="Find a table" inputmode="search" :debounce="120" />

        <section class="table-list">
          <button
            v-for="table in filteredTables"
            :key="table.id"
            type="button"
            class="table-row"
            @click="openTable(table.id)"
          >
            <span>
              <strong>{{ table.title }}</strong>
              <small>{{ systemLabels[table.system] }} / {{ table.category }}</small>
            </span>
            <ion-icon :icon="chevronForward" aria-hidden="true" />
          </button>
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
import { randomTables, systemLabels } from '../data/oracles';
import { useOracleSettings } from '../data/settings';

const router = useRouter();
const search = ref('');
const { selectedSystem, includeCustom } = useOracleSettings();

const filteredTables = computed(() => {
  const query = search.value.trim().toLowerCase();

  return randomTables.filter((table) => {
    const matchesSystem = table.system === selectedSystem.value || (includeCustom.value && table.system === 'custom');

    if (!matchesSystem) {
      return false;
    }

    if (!query) {
      return true;
    }

    return (
      table.title.toLowerCase().includes(query) ||
      table.category.toLowerCase().includes(query) ||
      systemLabels[table.system].toLowerCase().includes(query)
    );
  });
});

const openTable = (id: string) => {
  router.push({ name: 'RandomTableDetail', params: { id } });
};
</script>

<style scoped>
.table-list-shell {
  display: grid;
  gap: 12px;
  margin: 0 auto;
  max-width: 820px;
  padding: 14px 14px 32px;
}

.table-list {
  display: grid;
  gap: 8px;
}

.table-row {
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

.table-row span {
  display: grid;
  gap: 4px;
}

.table-row strong {
  font-size: 1rem;
}

.table-row small {
  color: #56616a;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
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
