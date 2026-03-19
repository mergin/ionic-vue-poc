<template>
  <ion-item
    role="article"
    :aria-labelledby="`social-post-title-${post.id}`"
    :aria-describedby="`social-post-body-${post.id}`"
  >
    <ion-avatar slot="start">
      <img :src="post.avatarUrl" alt="" aria-hidden="true" width="80" height="80" />
    </ion-avatar>
    <ion-label>
      <strong :id="`social-post-title-${post.id}`">{{ post.author.displayName }}</strong>
      <p>@{{ post.author.handle }}</p>
      <ion-text :id="`social-post-body-${post.id}`">{{ post.content }}</ion-text>
      <div class="post-actions">
        <ion-button size="small" :aria-pressed="post.likedByMe" @click="onLike">
          <ion-icon :icon="heartIcon" slot="icon-only" />
        </ion-button>
        <span class="likes-count">{{ post.likes }}</span>
        <ion-button size="small" @click="onRepost">
          <ion-icon :icon="repeatIcon" slot="icon-only" />
        </ion-button>
        <span class="reposts-count">{{ post.reposts }}</span>
      </div>
    </ion-label>
    <div class="metadata-end-wrapper" slot="end">
      <ion-note class="post-datetime" color="medium">
        <time :datetime="post.timestamp">{{ formatDate(post.timestamp) }}</time>
      </ion-note>
    </div>
  </ion-item>
</template>

<script setup lang="ts">
import { IonAvatar, IonButton, IonIcon, IonItem, IonLabel, IonNote, IonText } from '@ionic/vue';
import { heart, repeat } from 'ionicons/icons';
import { useI18n } from 'vue-i18n';

import type { SocialPost } from '../models/post';

const props = defineProps<{ post: SocialPost }>();
const emit = defineEmits(['like', 'repost']);

const { locale } = useI18n();
const heartIcon = heart;
const repeatIcon = repeat;

function onLike() {
  emit('like', props.post.id);
}
function onRepost() {
  emit('repost', props.post.id);
}
function formatDate(timestamp: string) {
  return new Date(timestamp).toLocaleString(locale.value);
}
</script>

<style scoped>
.post-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}
.likes-count,
.reposts-count {
  font-size: 0.9em;
  color: var(--app-text-muted);
}

.metadata-end-wrapper {
  position: absolute;
  top: 10px;
  inset-inline-end: 10px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
}

.post-datetime {
  font-size: 0.875rem;
}
</style>
