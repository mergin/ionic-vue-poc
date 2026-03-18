<template>
  <section aria-labelledby="weather-title" class="feature-panel">
    <h2 id="weather-title">{{ t('weather.title') }}</h2>
    <p>{{ t('weather.description') }}</p>

    <p v-if="loading" role="status" aria-live="polite">{{ t('weather.loading') }}</p>

    <div v-else-if="error" role="alert" aria-live="assertive">
      <p>{{ t('weather.error') }}</p>
      <ion-button size="small" @click="load">{{ t('common.retry') }}</ion-button>
    </div>

    <div v-else-if="summary" role="status" aria-live="polite" class="weather-details">
      <p>
        {{
          t('weather.status', {
            city: summary.city,
            temperature: summary.temperatureC,
            condition: summary.condition,
          })
        }}
      </p>
      <ul>
        <li>{{ t('weather.humidity', { value: summary.humidityPct }) }}</li>
        <li>{{ t('weather.wind', { value: summary.windKph }) }}</li>
      </ul>
      <p>
        {{ t('common.updatedAt', { time: dateFormatter.format(new Date(summary.updatedAt)) }) }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue'
import { useI18n } from 'vue-i18n'

import { useWeather } from '../composables/useWeather'

const { t } = useI18n()
const { loading, error, summary, load } = useWeather()

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
})
</script>

<style scoped>
.feature-panel {
  display: grid;
  gap: 0.75rem;
}

.weather-details {
  display: grid;
  gap: 0.5rem;
}

.weather-details ul {
  margin: 0;
  padding-left: 1rem;
}
</style>
