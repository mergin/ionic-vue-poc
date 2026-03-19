import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';

import type { SocialPost } from '../models/post';
import { fetchSocialPosts, likePost, repostPost } from '../services/social-service';

interface UseSocialFeedReturn {
  loading: Ref<boolean>;
  error: Ref<string | null>;
  posts: Ref<SocialPost[]>;
  load: () => Promise<void>;
  like: (postId: string) => Promise<void>;
  repost: (postId: string) => Promise<void>;
}

/** Encapsulates social feed loading, error handling, and retry behavior for UI components. */
export function useSocialFeed(): UseSocialFeedReturn {
  const loading = ref<boolean>(true);
  const error = ref<string | null>(null);
  const posts = ref<SocialPost[]>([]);

  async function load(): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      posts.value = await fetchSocialPosts();
    } catch {
      error.value = 'error';
    } finally {
      loading.value = false;
    }
  }

  onMounted(async () => {
    await load();
  });

  async function like(postId: string): Promise<void> {
    try {
      const updated = await likePost(postId);
      const idx = posts.value.findIndex((p) => p.id === postId);
      if (idx !== -1) posts.value[idx] = updated;
    } catch {
      // Optionally set error
    }
  }

  async function repost(postId: string): Promise<void> {
    try {
      const updated = await repostPost(postId);
      const idx = posts.value.findIndex((p) => p.id === postId);
      if (idx !== -1) posts.value[idx] = updated;
    } catch {
      // Optionally set error
    }
  }

  return {
    loading,
    error,
    posts,
    load,
    like,
    repost,
  };
}
