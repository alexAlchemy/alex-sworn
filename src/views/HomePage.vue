<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button aria-label="Open menu" />
        </ion-buttons>
        <ion-title>Sworn Oracles</ion-title>
        <ion-buttons slot="end">
          <ion-button aria-label="Open settings" @click="settingsOpen = true">
            <ion-icon slot="icon-only" :icon="settingsOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <main class="home-shell">
        <section class="roll-panel" aria-live="polite">
          <div class="roll-copy">
            <p class="eyebrow">{{ systemLabels[selectedTable.system] }} / {{ selectedTable.category }}</p>
            <h1>{{ selectedTable.title }}</h1>
            <p class="result">{{ currentResult ? getRollResultText(currentResult) : 'Tap a row to roll.' }}</p>
          </div>
          <button class="roll-button" :class="{ unrolled: !currentResult }" type="button" @click="rollSelectedTable">
            <span class="roll-value">{{ currentResult ? getRollValueLabel(currentResult) : getUnrolledLabel(selectedTable) }}</span>
            <span>Roll</span>
          </button>
        </section>

        <ion-searchbar
          v-model="search"
          placeholder="Find an oracle"
          inputmode="search"
          :debounce="120"
        />

        <section class="oracle-grid">
          <button
            v-for="table in filteredTables"
            :key="table.id"
            type="button"
            class="oracle-card"
            :class="{ active: table.id === selectedTable.id }"
            @click="rollRow(table)"
          >
            <strong>{{ table.title }}</strong>
            <span>{{ table.category }}</span>
          </button>
        </section>

      </main>

      <ion-modal
        :is-open="settingsOpen"
        :initial-breakpoint="0.42"
        :breakpoints="[0, 0.42, 0.72]"
        @didDismiss="settingsOpen = false"
      >
        <ion-content class="settings-sheet">
          <section class="settings-content">
            <div class="sheet-handle" aria-hidden="true"></div>
            <h2>Settings</h2>

            <ion-list :inset="true">
              <ion-radio-group :value="selectedSystem" @ionChange="handleSystemChange">
                <ion-list-header>
                  <ion-label>System</ion-label>
                </ion-list-header>
                <ion-item>
                  <ion-radio value="ironsworn">Ironsworn</ion-radio>
                </ion-item>
                <ion-item>
                  <ion-radio value="starforged">Starforged</ion-radio>
                </ion-item>
              </ion-radio-group>
            </ion-list>

            <ion-list :inset="true">
              <ion-item>
                <ion-checkbox :checked="includeCustom" @ionChange="handleIncludeCustomChange">
                  Include custom
                </ion-checkbox>
              </ion-item>
            </ion-list>
          </section>
        </ion-content>
      </ion-modal>

      <ion-modal
        :is-open="preRollOpen"
        :initial-breakpoint="1"
        :breakpoints="[0, 1]"
        class="pre-roll-modal"
        @didDismiss="closePreRoll"
      >
        <ion-content class="settings-sheet">
          <component
            :is="currentPreRollComponent"
            v-if="currentPreRollComponent && currentPreRollTable"
            :table="currentPreRollTable"
            @submit="completePreRoll"
          />
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSearchbar,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import { settingsOutline } from 'ionicons/icons';
import {
  getRollResultText,
  getRollValueLabel,
  getUnrolledLabel,
  oracleTables,
  rollTable,
  systemLabels,
  type PreRollPayload,
  type RollableTable,
  type RollResult
} from '../data/oracles';
import { useRollHistory } from '../data/history';
import { useOracleSettings, type CoreOracleSystem } from '../data/settings';
import ActionRollForm from '../components/pre-roll/ActionRollForm.vue';
import AskOracleForm from '../components/pre-roll/AskOracleForm.vue';

const search = ref('');
const selectedTable = ref(oracleTables[0]);
const currentResult = ref<RollResult | null>(null);
const settingsOpen = ref(false);
const preRollOpen = ref(false);
const currentPreRollTable = ref<RollableTable | null>(null);
const { addRoll } = useRollHistory();
const { selectedSystem, includeCustom, setSelectedSystem, setIncludeCustom } = useOracleSettings();

const preRollForms = {
  ActionRollForm,
  AskOracleForm
};

const currentPreRollComponent = computed(() => {
  const formName = currentPreRollTable.value?.preRollForm?.component;
  return formName ? preRollForms[formName] : null;
});

const filteredTables = computed(() => {
  const query = search.value.trim().toLowerCase();

  return oracleTables.filter((table) => {
    const matchesSystem = table.system === selectedSystem.value || (includeCustom.value && table.system === 'custom');
    const matchesQuery =
      !query ||
      table.title.toLowerCase().includes(query) ||
      table.category.toLowerCase().includes(query) ||
      systemLabels[table.system].toLowerCase().includes(query);

    return matchesSystem && matchesQuery;
  });
});

watch([selectedSystem, includeCustom], () => {
  if (!filteredTables.value.some((table) => table.id === selectedTable.value.id)) {
    selectedTable.value = filteredTables.value[0] ?? oracleTables[0];
    currentResult.value = null;
  }
});

const handleSystemChange = (event: CustomEvent<{ value: CoreOracleSystem }>) => {
  setSelectedSystem(event.detail.value);
};

const handleIncludeCustomChange = (event: CustomEvent<{ checked: boolean }>) => {
  setIncludeCustom(event.detail.checked);
};

const completeRoll = (table: RollableTable, payload?: PreRollPayload) => {
  currentResult.value = rollTable(table, payload);
  addRoll(table, currentResult.value);
};

const requestRoll = (table: RollableTable) => {
  if (table.preRollForm) {
    currentPreRollTable.value = table;
    preRollOpen.value = true;
    return;
  }

  completeRoll(table);
};

const rollSelectedTable = () => {
  requestRoll(selectedTable.value);
};

const rollRow = (table: RollableTable) => {
  selectedTable.value = table;
  requestRoll(table);
};

const completePreRoll = (payload: PreRollPayload) => {
  const table = currentPreRollTable.value;

  if (table) {
    selectedTable.value = table;
    completeRoll(table, payload);
  }

  preRollOpen.value = false;
};

const closePreRoll = () => {
  preRollOpen.value = false;
  currentPreRollTable.value = null;
};
</script>

<style scoped>
.home-shell {
  display: grid;
  gap: 16px;
  margin: 0 auto;
  max-width: 920px;
  padding: 18px 14px 32px;
}

.roll-panel {
  align-items: stretch;
  background: linear-gradient(135deg, #101820, #2d3527 58%, #9b6a3a);
  border-radius: 8px;
  color: #fff7eb;
  display: grid;
  gap: 18px;
  min-height: 230px;
  overflow: hidden;
  padding: 20px;
}

.roll-copy {
  display: grid;
  gap: 10px;
}

.eyebrow {
  color: inherit;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  margin: 0;
  opacity: 0.78;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin: 0;
}

h1 {
  align-items: end;
  display: flex;
  font-size: clamp(1.7rem, 8vw, 2.8rem);
  line-height: 1.04;
  min-height: 2.1em;
}

h2 {
  color: #1d252c;
  font-size: 1rem;
}

.result {
  font-size: 1.15rem;
  line-height: 1.35;
  max-width: 34rem;
}

.roll-button {
  align-items: center;
  align-self: end;
  background: #f6d36f;
  border: 0;
  border-radius: 8px;
  color: #182025;
  display: flex;
  font: inherit;
  font-weight: 800;
  gap: 12px;
  justify-content: center;
  min-height: 70px;
  padding: 12px 18px;
  width: 100%;
}

.roll-button.unrolled {
  background: #d9e4dc;
  color: #18362d;
}

.roll-value {
  align-items: center;
  background: #182025;
  border-radius: 999px;
  color: #fff7eb;
  display: inline-flex;
  height: 44px;
  justify-content: center;
  min-width: 64px;
  padding: 0 14px;
}

.roll-button.unrolled .roll-value {
  background: #2f604f;
}

.oracle-grid {
  display: grid;
  gap: 8px;
}

.oracle-card {
  align-items: center;
  background: #fffaf1;
  border: 1px solid #dacdbb;
  border-radius: 8px;
  color: #1d252c;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  min-height: 54px;
  padding: 12px 14px;
  text-align: left;
  width: 100%;
}

.oracle-card.active {
  background: #f1e2c8;
  border-color: #9b6a3a;
}

.oracle-card strong {
  font-size: 1rem;
  line-height: 1.2;
}

.oracle-card span:last-child {
  color: #56616a;
  flex: 0 0 auto;
  font-size: 0.9rem;
}

ion-content {
  --background: #f7f2e8;
}

ion-searchbar {
  --background: #fffaf1;
  --border-radius: 8px;
  padding-inline: 0;
}

.settings-sheet {
  --background: #f7f2e8;
}

.settings-content {
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

.settings-content h2 {
  padding: 2px 8px 0;
}

.pre-roll-modal {
  --height: min(430px, 86vh);
}

@media (min-width: 720px) {
  .home-shell {
    gap: 20px;
    padding: 28px 24px 44px;
  }

  .roll-panel {
    grid-template-columns: 1fr 180px;
    min-height: 260px;
    padding: 28px;
  }
}
</style>
