<template>
  <section aria-labelledby="social-title" class="feature-panel">
    <h2 id="social-title">{{ t('social.title') }}</h2>
    <p>{{ t('social.description') }}</p>

    <p v-if="loading" role="status" aria-live="polite">{{ t('social.loading') }}</p>

    <div v-else-if="error" role="alert" aria-live="assertive">
      <p>{{ t('social.error') }}</p>
      <ion-button size="small" @click="load">{{ t('common.retry') }}</ion-button>
    </div>

    <ul v-else class="feed-list">
      <li v-for="post in posts" :key="post.id">
        <strong>{{ post.author }}</strong>
        <p>{{ post.message }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue'
import { useI18n } from 'vue-i18n'

import { useSocialFeed } from '../composables/useSocialFeed'

const { t } = useI18n()
const { loading, error, posts, load } = useSocialFeed()
</script>

<style scoped>
.feature-panel {
  display: grid;
  gap: 0.75rem;
}

.empty-state {
  color: var(--app-text-muted);
}

.feed-list {
  display: grid;
  gap: 0.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
