import { createI18n } from 'vue-i18n';

import en from '@/assets/i18n/en.json';
import es from '@/assets/i18n/es.json';

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    es,
  },
});
