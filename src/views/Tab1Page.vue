<template>
  <ion-page>
    <AppHeader title-key="social.title" />
    <ion-content :fullscreen="true">
      <main class="tab-main" :aria-label="t('a11y.socialMain')">
        <SocialFeedPanel />
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { useI18n } from 'vue-i18n';

import AppHeader from '@/app/AppHeader.vue';
import SocialFeedPanel from '@/features/social-media/components/SocialFeedPanel.vue';

const { t } = useI18n();
</script>

<style scoped>
.tab-main {
  padding: 1rem;
}
</style>
