import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'

import type { SocialPost } from '../models/post'
import { fetchSocialPosts } from '../services/social-service'

interface UseSocialFeedReturn {
  loading: Ref<boolean>
  error: Ref<string | null>
  posts: Ref<SocialPost[]>
  load: () => Promise<void>
}

/** Encapsulates social feed loading, error handling, and retry behavior for UI components. */
export function useSocialFeed(): UseSocialFeedReturn {
  const loading = ref<boolean>(true)
  const error = ref<string | null>(null)
  const posts = ref<SocialPost[]>([])

  async function load(): Promise<void> {
    loading.value = true
    error.value = null

    try {
      posts.value = await fetchSocialPosts()
    } catch {
      error.value = 'error'
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await load()
  })

  return {
    loading,
    error,
    posts,
    load,
  }
}
