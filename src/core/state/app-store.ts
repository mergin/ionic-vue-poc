import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export type AppLocale = 'en' | 'es';

export const useAppStore = defineStore('app', () => {
  const locale = ref<AppLocale>('en');

  const isSpanish = computed(() => locale.value === 'es');

  function setLocale(nextLocale: AppLocale): void {
    locale.value = nextLocale;
  }

  return {
    locale,
    isSpanish,
    setLocale,
  };
});
