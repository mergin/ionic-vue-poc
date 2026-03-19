import { describe, expect, test } from 'vitest';
import { fetchSocialPosts } from '@/features/social-media/services/social-service';
import { mswServer } from '../msw-server';
import { http } from 'msw';
import '../setup';

// ARRANGE: MSW handlers are already set up globally in test setup

describe('fetchSocialPosts', () => {
  test('returns posts on success', async () => {
    // ACT
    const posts = await fetchSocialPosts();

    // ASSERT
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('author');
    expect(posts[0]).toHaveProperty('content');
  });

  test('throws AppError on API failure', async () => {
    mswServer.use(http.get('/api/social', (_req, res, ctx) => res(ctx.status(500))));
    // ACT & ASSERT
    await expect(fetchSocialPosts()).rejects.toMatchObject({
      message: expect.stringContaining('Failed to load social posts'),
    });
  });
});
