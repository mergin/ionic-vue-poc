<template>
  <ion-page>
    <AppHeader title-key="weather.title" />
    <ion-content :fullscreen="true">
      <main class="tab-main" :aria-label="t('a11y.weatherMain')">
        <WeatherPanel />
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue'
import { useI18n } from 'vue-i18n'

import AppHeader from '@/app/AppHeader.vue'
import WeatherPanel from '@/features/weather/components/WeatherPanel.vue'

const { t } = useI18n()
</script>

<style scoped>
.tab-main {
  padding: 1rem;
}
</style>
