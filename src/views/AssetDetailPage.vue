<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/assets" text="" />
        </ion-buttons>
        <ion-title>{{ asset?.title ?? 'Asset' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <main v-if="asset" class="asset-detail-shell">
        <header class="detail-heading">
          <span class="asset-swatch" :style="{ '--asset-color': asset.color ?? '#2f604f' }" aria-hidden="true"></span>
          <p>{{ systemLabels[asset.system] }} / {{ asset.group }}</p>
          <h1>{{ asset.title }}</h1>
          <div v-if="asset.description" class="description">{{ asset.description }}</div>
        </header>

        <section v-if="facts.length" class="fact-list">
          <article v-for="fact in facts" :key="fact.label" class="fact-row">
            <strong>{{ fact.label }}</strong>
            <p>{{ fact.value }}</p>
          </article>
        </section>

        <section class="ability-list">
          <article v-for="(ability, index) in asset.abilities" :key="ability.id" class="ability-card">
            <div class="ability-heading">
              <span>{{ index + 1 }}</span>
              <strong>{{ ability.name ?? (ability.enabled ? 'Starting ability' : 'Upgrade') }}</strong>
            </div>
            <p>{{ ability.text }}</p>
          </article>
        </section>
      </main>

      <main v-else class="asset-detail-shell">
        <section class="empty-state">
          <h1>Asset not found</h1>
          <ion-button router-link="/assets" router-direction="root">Back to Assets</ion-button>
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
import { findAsset } from '../data/assets';
import { systemLabels } from '../data/oracles';

const route = useRoute();
const asset = computed(() => findAsset(String(route.params.id)));

const facts = computed(() => {
  const currentAsset = asset.value;

  if (!currentAsset) {
    return [];
  }

  return [
    currentAsset.requirement ? { label: 'Requirement', value: currentAsset.requirement } : null,
    currentAsset.inputs.length ? { label: 'Inputs', value: currentAsset.inputs.join(', ') } : null,
    currentAsset.conditionMeter ? { label: 'Meter', value: currentAsset.conditionMeter } : null,
    currentAsset.attachments ? { label: 'Attachments', value: currentAsset.attachments } : null,
    currentAsset.shared ? { label: 'Usage', value: 'Shared asset' } : null
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));
});
</script>

<style scoped>
.asset-detail-shell {
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

.asset-swatch {
  background: var(--asset-color);
  border-radius: 999px;
  height: 5px;
  width: 52px;
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

.description,
.fact-list,
.ability-card {
  background: #fffaf1;
  border: 1px solid #dacdbb;
  border-radius: 8px;
}

.description {
  color: #3f4a52;
  line-height: 1.45;
  margin-top: 6px;
  padding: 12px;
}

.fact-list {
  overflow: hidden;
}

.fact-row {
  display: grid;
  gap: 6px;
  padding: 10px 12px;
}

.fact-row + .fact-row {
  border-top: 1px solid #dacdbb;
}

.fact-row strong,
.ability-heading strong {
  color: #1d252c;
}

.fact-row p,
.ability-card p {
  color: #3f4a52;
  line-height: 1.42;
  margin: 0;
}

.ability-list {
  display: grid;
  gap: 10px;
}

.ability-card {
  display: grid;
  gap: 9px;
  padding: 12px;
}

.ability-heading {
  align-items: center;
  display: flex;
  gap: 10px;
}

.ability-heading span {
  align-items: center;
  background: #2f604f;
  border-radius: 999px;
  color: #fffaf1;
  display: inline-flex;
  flex: 0 0 28px;
  font-size: 0.9rem;
  font-weight: 800;
  height: 28px;
  justify-content: center;
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
