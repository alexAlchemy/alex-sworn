<template>
  <ion-app>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Sworn Oracles</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-menu-toggle :auto-hide="false">
            <ion-item button router-link="/" router-direction="root">
              <ion-label>Oracles</ion-label>
            </ion-item>
            <ion-item button router-link="/history" router-direction="forward">
              <ion-label>History</ion-label>
            </ion-item>
            <ion-item button router-link="/tables" router-direction="forward">
              <ion-label>Tables</ion-label>
            </ion-item>
            <ion-item button router-link="/assets" router-direction="forward">
              <ion-label>Assets</ion-label>
            </ion-item>
            <ion-item button router-link="/about" router-direction="forward">
              <ion-label>About</ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-router-outlet id="main-content" />
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
</script>
