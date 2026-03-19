<template>
  <section aria-labelledby="gallery-title" class="feature-panel">
    <h2 id="gallery-title">{{ t('gallery.title') }}</h2>
    <p>{{ t('gallery.description') }}</p>

    <p v-if="loading" role="status" aria-live="polite">{{ t('gallery.loading') }}</p>

    <div v-else-if="error" role="alert" aria-live="assertive">
      <p>{{ t('gallery.error') }}</p>
      <ion-button size="small" @click="load">{{ t('common.retry') }}</ion-button>
    </div>

    <ul v-else class="gallery-list">
      <li v-for="image in images" :key="image.id">
        <img :src="image.url" :alt="image.title" loading="lazy" width="240" height="160" />
        <p>{{ image.title }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import { useI18n } from 'vue-i18n';

import { useGallery } from '../composables/useGallery';

const { t } = useI18n();
const { loading, error, images, load } = useGallery();
</script>

<style scoped>
.feature-panel {
  display: grid;
  gap: 0.75rem;
}

.empty-state {
  color: var(--app-text-muted);
}

.gallery-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.gallery-list img {
  border-radius: var(--app-radius-sm);
  width: 100%;
  object-fit: cover;
}
</style>
