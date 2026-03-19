import { delay, http, HttpResponse } from 'msw';
import { socialPostsDb, type MockSocialPost } from '../db';

const BASE = '/api';

const DELAY = {
  short: 150,
  medium: 200,
  long: 300,
} as const;

function randomizeEngagement(post: MockSocialPost): MockSocialPost {
  const likesBoost = Math.floor(Math.random() * 7);
  const repliesBoost = Math.floor(Math.random() * 3);
  const repostsBoost = Math.floor(Math.random() * 2);
  return {
    ...post,
    likes: post.likes + likesBoost,
    replies: post.replies + repliesBoost,
    reposts: post.reposts + repostsBoost,
  };
}

export const socialMediaHandlers = [
  http.get(`${BASE}/social`, async () => {
    await delay(DELAY.long);
    const posts = [...socialPostsDb]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .map(randomizeEngagement);
    return HttpResponse.json({ posts });
  }),

  http.get(`${BASE}/social/:id`, async ({ params }) => {
    await delay(DELAY.medium);
    const post = socialPostsDb.find(({ id }) => id === params['id']);
    if (!post) {
      return HttpResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    return HttpResponse.json(post);
  }),

  http.post(`${BASE}/social/:id/likes`, async ({ params }) => {
    await delay(DELAY.short);
    const post = socialPostsDb.find(({ id }) => id === params['id']);
    if (!post) {
      return HttpResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    post.likes++;
    post.likedByMe = true;
    return HttpResponse.json(post);
  }),

  http.post(`${BASE}/social/:id/reposts`, async ({ params }) => {
    await delay(DELAY.short);
    const post = socialPostsDb.find(({ id }) => id === params['id']);
    if (!post) {
      return HttpResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    post.reposts++;
    return HttpResponse.json(post);
  }),
];
