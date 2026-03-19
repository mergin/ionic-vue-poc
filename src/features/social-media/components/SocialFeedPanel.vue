import { useI18n } from 'vue-i18n';
<template>
  <section aria-labelledby="social-title" class="feature-panel">
    <h2 id="social-title">{{ t('social.title') }}</h2>
    <p>{{ t('social.description') }}</p>

    <p v-if="loading" role="status" aria-live="polite">{{ t('social.loading') }}</p>

    <div v-else-if="error" role="alert" aria-live="assertive">
      <p>{{ t('social.error') }}</p>
      <ion-button size="small" @click="load" data-testid="retry-btn">{{
        t('common.retry')
      }}</ion-button>
    </div>

    <ul v-else class="feed-list" role="list" :aria-label="t('social.feedAriaLabel')">
      <li v-for="post in posts" :key="post.id">
        <SocialPost :post="post" @like="onLike" @repost="onRepost" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import SocialPost from './SocialPost.vue';

import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useSocialFeed } from '../composables/useSocialFeed';

const { t } = useI18n();

const props = defineProps<{
  loading?: boolean;
  error?: string | null;
  posts?: any[];
}>();

const feed = useSocialFeed();

const loading = computed(() => props.loading ?? feed.loading.value);
const error = computed(() => props.error ?? feed.error.value);
const posts = computed(() => props.posts ?? feed.posts.value);
const load = feed.load;
const like = feed.like;
const repost = feed.repost;

function onLike(postId: string) {
  like(postId);
}
function onRepost(postId: string) {
  repost(postId);
}
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
