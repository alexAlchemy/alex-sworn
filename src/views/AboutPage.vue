<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button aria-label="Open menu" />
        </ion-buttons>
        <ion-title>About</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <main class="about-shell">
        <section>
          <h1>Sworn Oracles</h1>
          <p>
            A small mobile-first oracle roller for Ironsworn, Ironsworn: Delve, and Ironsworn:
            Starforged.
          </p>
        </section>

        <section>
          <h2>Attribution</h2>
          <p>
            Ironsworn, Ironsworn: Delve, and Ironsworn: Starforged are created by Shawn Tomkin.
            All game text, names, rules, setting material, and oracle content remain the property of
            Shawn Tomkin, Tomkin Press, and other credited rightsholders as applicable.
          </p>
          <p>
            Starforged is copyright © 2022 Shawn Tomkin and Absolute Tabletop, LLC. This app is an
            unofficial fan tool and is not affiliated with or endorsed by Shawn Tomkin, Tomkin Press,
            or Absolute Tabletop.
          </p>
        </section>

        <section>
          <h2>Data</h2>
          <p>
            Oracle data is imported from the Dataforged package. Dataforged provides structured
            Ironsworn and Starforged content for community tools.
          </p>
          <p>
            Dataforged notes that Starforged textual data is used under Creative Commons Attribution
            4.0, while the Ironsworn preview data in that package is under Creative Commons
            Attribution-NonCommercial 4.0.
          </p>
        </section>

        <section>
          <h2>Links</h2>
          <ion-list :inset="true">
            <ion-item button href="https://www.ironswornrpg.com/" target="_blank" rel="noreferrer">
              <ion-label>Ironsworn RPG</ion-label>
            </ion-item>
            <ion-item button href="https://www.ironswornrpg.com/licensing" target="_blank" rel="noreferrer">
              <ion-label>Ironsworn Licensing</ion-label>
            </ion-item>
            <ion-item button href="https://www.npmjs.com/package/dataforged" target="_blank" rel="noreferrer">
              <ion-label>Dataforged</ion-label>
            </ion-item>
            <ion-item button href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
              <ion-label>CC BY 4.0</ion-label>
            </ion-item>
            <ion-item button href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noreferrer">
              <ion-label>CC BY-NC 4.0</ion-label>
            </ion-item>
          </ion-list>
        </section>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
</script>

<style scoped>
.about-shell {
  display: grid;
  gap: 20px;
  margin: 0 auto;
  max-width: 720px;
  padding: 18px 14px 36px;
}

section {
  display: grid;
  gap: 10px;
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
}

p {
  color: #3f4a52;
  line-height: 1.45;
}

ion-content {
  --background: #f7f2e8;
}
</style>
