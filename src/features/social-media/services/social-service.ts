import { getJson } from '@/core/api/http-client'
import { AppError } from '@/core/error/app-error'

import type { SocialPost } from '../models/post'

interface SocialResponse {
  posts: SocialPost[]
}

/** Retrieves social posts from the API contract endpoint. */
export async function fetchSocialPosts(): Promise<SocialPost[]> {
  try {
    const response = await getJson<SocialResponse>('/api/social')
    return response.posts
  } catch (error) {
    throw new AppError('Failed to load social posts.', error)
  }
}
