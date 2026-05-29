<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button aria-label="Open menu" />
        </ion-buttons>
        <ion-title>Assets</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <main class="asset-list-shell">
        <ion-searchbar v-model="search" placeholder="Find an asset" inputmode="search" :debounce="120" />

        <nav class="group-rail" aria-label="Asset groups">
          <button
            v-for="group in groupOptions"
            :key="group"
            type="button"
            class="group-chip"
            :class="{ active: group === selectedGroup }"
            @click="selectedGroup = group"
          >
            {{ group }}
          </button>
        </nav>

        <section class="asset-list">
          <button
            v-for="asset in filteredAssets"
            :key="asset.id"
            type="button"
            class="asset-row"
            @click="openAsset(asset.id)"
          >
            <span class="asset-swatch" :style="{ '--asset-color': asset.color ?? '#2f604f' }" aria-hidden="true"></span>
            <span class="asset-copy">
              <strong>{{ asset.title }}</strong>
              <small>{{ asset.group }}{{ asset.shared ? ' / Shared' : '' }}</small>
            </span>
            <ion-icon :icon="chevronForward" aria-hidden="true" />
          </button>
        </section>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
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
import { assetGroupOrders, gameAssets } from '../data/assets';
import { useOracleSettings } from '../data/settings';

const allGroup = 'All';
const router = useRouter();
const search = ref('');
const selectedGroup = ref(allGroup);
const { selectedSystem } = useOracleSettings();

const groupOptions = computed(() => {
  const available = new Set(gameAssets.filter((asset) => asset.system === selectedSystem.value).map((asset) => asset.group));
  const ordered = assetGroupOrders[selectedSystem.value].filter((group) => group === allGroup || available.has(group));
  const extras = [...available].filter((group) => !ordered.includes(group)).sort();

  return [...ordered, ...extras];
});

const filteredAssets = computed(() => {
  const query = search.value.trim().toLowerCase();

  return gameAssets.filter((asset) => {
    const matchesSystem = asset.system === selectedSystem.value;
    const matchesGroup = selectedGroup.value === allGroup || asset.group === selectedGroup.value;
    const matchesQuery =
      !query ||
      asset.title.toLowerCase().includes(query) ||
      asset.group.toLowerCase().includes(query) ||
      asset.abilities.some((ability) => ability.text.toLowerCase().includes(query));

    return matchesSystem && matchesGroup && matchesQuery;
  });
});

watch(selectedSystem, () => {
  selectedGroup.value = allGroup;
});

const openAsset = (id: string) => {
  router.push({ name: 'AssetDetail', params: { id } });
};
</script>

<style scoped>
.asset-list-shell {
  display: grid;
  gap: 12px;
  margin: 0 auto;
  max-width: 820px;
  padding: 14px 14px 32px;
}

.group-rail {
  display: flex;
  gap: 8px;
  margin: -4px -14px 0;
  overflow-x: auto;
  padding: 0 14px 2px;
  scrollbar-width: none;
  white-space: nowrap;
}

.group-rail::-webkit-scrollbar {
  display: none;
}

.group-chip {
  background: #eee4d4;
  border: 1px solid #d5c8b5;
  border-radius: 999px;
  color: #334048;
  flex: 0 0 auto;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 750;
  min-height: 34px;
  padding: 6px 13px;
}

.group-chip.active {
  background: #2f604f;
  border-color: #2f604f;
  color: #fffaf1;
}

.asset-list {
  display: grid;
  gap: 8px;
}

.asset-row {
  align-items: center;
  background: #fffaf1;
  border: 1px solid #dacdbb;
  border-radius: 8px;
  color: #1d252c;
  display: grid;
  font: inherit;
  gap: 10px;
  grid-template-columns: 10px 1fr auto;
  min-height: 58px;
  padding: 10px 12px;
  text-align: left;
  width: 100%;
}

.asset-swatch {
  background: var(--asset-color);
  border-radius: 999px;
  height: 34px;
  width: 4px;
}

.asset-copy {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.asset-copy strong {
  font-size: 1rem;
}

.asset-copy small {
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
