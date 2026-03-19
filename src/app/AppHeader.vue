<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ t(titleKey) }}</ion-title>
      <ion-buttons slot="end">
        <ion-item lines="none" class="language-switcher">
          <ion-icon aria-hidden="true" name="language-outline" slot="start" />
          <ion-select
            :label="t('app.language')"
            label-placement="stacked"
            :model-value="locale"
            interface="popover"
            @ionChange="onLocaleChange"
          >
            <ion-select-option value="en">{{ t('app.english') }}</ion-select-option>
            <ion-select-option value="es">{{ t('app.spanish') }}</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonHeader,
  IonIcon,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import type { SelectCustomEvent } from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

import { useAppStore, type AppLocale } from '@/core/state/app-store';

defineProps<{
  titleKey: string;
}>();

const appStore = useAppStore();
const { locale } = storeToRefs(appStore);
const { t, locale: i18nLocale } = useI18n();

function onLocaleChange(event: SelectCustomEvent): void {
  const nextLocale = event.detail.value as AppLocale;
  appStore.setLocale(nextLocale);
  i18nLocale.value = nextLocale;
}
</script>

<style scoped>
.language-switcher {
  --inner-padding-end: 0;
}
</style>
