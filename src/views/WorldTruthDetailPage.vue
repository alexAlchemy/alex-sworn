<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/truths" text="" />
        </ion-buttons>
        <ion-title>{{ truth?.title ?? 'World Truth' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <main v-if="truth" class="truth-detail-shell">
        <header class="detail-heading">
          <p>{{ systemLabels[truth.system] }} / World Truth</p>
          <h1>{{ truth.title }}</h1>
        </header>

        <section class="option-list">
          <article v-for="option in truth.options" :key="option.id" class="truth-option">
            <div class="option-heading">
              <strong>{{ option.range }}</strong>
              <h2>{{ option.result }}</h2>
            </div>

            <p v-if="option.description" class="description">{{ option.description }}</p>

            <section v-if="option.subtable.length" class="subtable">
              <article v-for="row in option.subtable" :key="row.id" class="subtable-row">
                <strong>{{ row.range }}</strong>
                <p>{{ row.result }}</p>
              </article>
            </section>

            <p v-if="option.questStarter" class="quest-starter">
              <strong>Quest Starter</strong>
              {{ option.questStarter }}
            </p>
          </article>
        </section>
      </main>

      <main v-else class="truth-detail-shell">
        <section class="empty-state">
          <h1>Truth not found</h1>
          <ion-button router-link="/truths" router-direction="root">Back to World Truths</ion-button>
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
import { systemLabels } from '../data/oracles';
import { findWorldTruth } from '../data/truths';

const route = useRoute();
const truth = computed(() => findWorldTruth(String(route.params.id)));
</script>

<style scoped>
.truth-detail-shell {
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

h1,
h2,
p {
  margin: 0;
}

h1 {
  color: #1d252c;
  font-size: 1.8rem;
}

h2 {
  color: #1d252c;
  font-size: 1.05rem;
  line-height: 1.25;
}

.option-list {
  display: grid;
  gap: 12px;
}

.truth-option {
  background: #fffaf1;
  border: 1px solid #dacdbb;
  border-radius: 8px;
  display: grid;
  gap: 10px;
  padding: 12px;
}

.option-heading {
  display: grid;
  gap: 6px;
}

.option-heading strong,
.subtable-row strong {
  color: #2f604f;
  font-size: 0.9rem;
}

.description,
.quest-starter,
.subtable-row p {
  color: #3f4a52;
  line-height: 1.42;
}

.subtable {
  border: 1px solid #dacdbb;
  border-radius: 8px;
  overflow: hidden;
}

.subtable-row {
  display: grid;
  gap: 8px;
  grid-template-columns: 66px 1fr;
  padding: 8px 10px;
}

.subtable-row + .subtable-row {
  border-top: 1px solid #dacdbb;
}

.quest-starter {
  background: #f1e2c8;
  border-radius: 8px;
  display: grid;
  gap: 4px;
  padding: 10px;
}

.quest-starter strong {
  color: #1d252c;
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
