<template>
  <ion-page>
    <AppHeader title-key="gallery.title" />
    <ion-content :fullscreen="true">
      <main class="tab-main" :aria-label="t('a11y.galleryMain')">
        <GalleryPanel />
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { useI18n } from 'vue-i18n';

import AppHeader from '@/app/AppHeader.vue';
import GalleryPanel from '@/features/image-gallery/components/GalleryPanel.vue';

const { t } = useI18n();
</script>

<style scoped>
.tab-main {
  padding: 1rem;
}
</style>
