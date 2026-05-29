<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button aria-label="Open menu" />
        </ion-buttons>
        <ion-title>History</ion-title>
        <ion-buttons slot="end">
          <ion-button v-if="recentRolls.length" aria-label="Clear history" @click="clearHistory">
            Clear
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <main class="history-shell">
        <section v-if="recentRolls.length" class="history-list">
          <article v-for="roll in recentRolls" :key="roll.id" class="history-card">
            <div>
              <p class="eyebrow">{{ systemLabels[roll.table.system] }} / {{ roll.table.category }}</p>
              <h2>{{ roll.table.title }}</h2>
            </div>
            <p class="result">{{ getRollResultText(roll.result) }}</p>
            <div class="roll-meta">
              <span>{{ getUnrolledLabel(roll.table) }}</span>
              <strong>{{ getRollValueLabel(roll.result) }}</strong>
              <time :datetime="roll.createdAt.toISOString()">{{ formatTime(roll.createdAt) }}</time>
            </div>
          </article>
        </section>

        <section v-else class="empty-state">
          <h1>No rolls yet</h1>
          <p>Your oracle results will appear here after you roll.</p>
          <ion-button router-link="/" router-direction="root">Go to Oracles</ion-button>
        </section>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import { getRollResultText, getRollValueLabel, getUnrolledLabel, systemLabels } from '../data/oracles';
import { useRollHistory } from '../data/history';

const { recentRolls, clearHistory } = useRollHistory();

const formatTime = (date: Date) =>
  new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
</script>

<style scoped>
.history-shell {
  display: grid;
  gap: 14px;
  margin: 0 auto;
  max-width: 720px;
  padding: 18px 14px 32px;
}

.history-list {
  display: grid;
  gap: 10px;
}

.history-card {
  background: #fffaf1;
  border: 1px solid #dacdbb;
  border-radius: 8px;
  color: #1d252c;
  display: grid;
  gap: 12px;
  padding: 14px;
}

.eyebrow {
  color: #56616a;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  margin: 0 0 6px;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin: 0;
}

h1 {
  font-size: 1.8rem;
}

h2 {
  font-size: 1rem;
}

.result {
  font-size: 1.2rem;
  line-height: 1.3;
}

.roll-meta {
  align-items: center;
  color: #56616a;
  display: flex;
  gap: 10px;
}

.roll-meta strong {
  align-items: center;
  background: #2f604f;
  border-radius: 999px;
  color: #fffaf1;
  display: inline-flex;
  min-width: 44px;
  justify-content: center;
  padding: 6px 10px;
}

.roll-meta time {
  margin-left: auto;
}

.empty-state {
  align-items: start;
  display: grid;
  gap: 14px;
  padding-top: 42px;
}
</style>
