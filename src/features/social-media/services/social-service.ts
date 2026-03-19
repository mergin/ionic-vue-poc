import { getJson } from '@/core/api/http-client';
import { AppError } from '@/core/error/app-error';

import type { SocialPost } from '../models/post';

interface SocialResponse {
  posts: SocialPost[];
}

/** Retrieves social posts from the API contract endpoint. */
export async function fetchSocialPosts(): Promise<SocialPost[]> {
  try {
    const response = await getJson<SocialResponse>('/api/social');
    return response.posts;
  } catch (error) {
    throw new AppError('Failed to load social posts.', error);
  }
}

/** Likes a post and returns its updated state. */
export async function likePost(postId: string): Promise<SocialPost> {
  try {
    // POST to /api/social/:id/likes
    return await getJson<SocialPost>(`/api/social/${postId}/likes`, { method: 'POST' });
  } catch (error) {
    throw new AppError('Failed to like post.', error);
  }
}

/** Reposts a post and returns its updated state. */
export async function repostPost(postId: string): Promise<SocialPost> {
  try {
    // POST to /api/social/:id/reposts
    return await getJson<SocialPost>(`/api/social/${postId}/reposts`, { method: 'POST' });
  } catch (error) {
    throw new AppError('Failed to repost.', error);
  }
}
