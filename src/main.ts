import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import { IonicVue } from '@ionic/vue';
import { i18n } from '@/core/i18n';
import { registerAppIcons } from '@/app/icon-registry';
import { setupWebVitalsReporting } from '@/core/performance/web-vitals';
import { useAppStore } from '@/core/state/app-store';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './styles/variables.css';

const pinia = createPinia();

registerAppIcons();

async function startMockWorker(): Promise<void> {
  const shouldEnableMsw = import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW !== 'false';

  if (!shouldEnableMsw) {
    return;
  }

  const { worker } = await import('@/mocks/browser');
  await worker.start({
    onUnhandledRequest: 'bypass',
  });
}

async function bootstrap(): Promise<void> {
  await startMockWorker();

  const app = createApp(App).use(IonicVue).use(pinia).use(i18n).use(router);

  const appStore = useAppStore(pinia);
  i18n.global.locale.value = appStore.locale;

  setupWebVitalsReporting();

  await router.isReady();
  app.mount('#app');
}

void bootstrap();
