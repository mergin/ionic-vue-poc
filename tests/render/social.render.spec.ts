import { render, screen, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia';
import SocialFeedPanel from '@/features/social-media/components/SocialFeedPanel.vue';
import en from '@/assets/i18n/en.json';
import es from '@/assets/i18n/es.json';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: { en, es },
});

describe('SocialFeedPanel', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  test('renders loading state', async () => {
    render(SocialFeedPanel, {
      global: {
        plugins: [createPinia(), i18n],
        components: {
          'ion-button': { template: '<button><slot /></button>' },
          SocialPost: { template: '<div>SocialPost</div>' },
        },
      },
      props: { loading: true, error: null, posts: [] },
    });
    expect(await screen.findByRole('status')).toHaveTextContent(en.social.loading);
  });

  test('renders posts after load', async () => {
    render(SocialFeedPanel, {
      global: {
        plugins: [createPinia(), i18n],
        components: {
          'ion-button': { template: '<button><slot /></button>' },
          SocialPost: { template: '<div>SocialPost</div>' },
        },
      },
      props: {
        loading: false,
        error: null,
        posts: [
          {
            id: '1',
            author: 'A',
            content: 'C',
            likes: 1,
            replies: 0,
            reposts: 0,
            timestamp: '2026-03-19T00:00:00Z',
          },
        ],
      },
    });
    expect(await screen.findByRole('heading', { name: en.social.title })).toBeTruthy();
    expect(await screen.findByText(en.social.description)).toBeTruthy();
    expect(await screen.findByRole('list')).toBeTruthy();
    expect(screen.queryByRole('status')).toBeNull();
  });

  test('renders error and retry', async () => {
    render(SocialFeedPanel, {
      global: {
        plugins: [createPinia(), i18n],
        components: {
          'ion-button': { template: '<button><slot /></button>' },
          SocialPost: { template: '<div>SocialPost</div>' },
        },
      },
      props: { loading: false, error: en.social.error, posts: [] },
    });
    expect(await screen.findByRole('alert')).toHaveTextContent(en.social.error);
    const retry = await screen.findByTestId('retry-btn');
    expect(retry).toBeInTheDocument();
    await fireEvent.click(retry);
  });

  test('renders in Spanish', async () => {
    i18n.global.locale.value = 'es';
    render(SocialFeedPanel, {
      global: {
        plugins: [createPinia(), i18n],
        components: {
          'ion-button': { template: '<button><slot /></button>' },
          SocialPost: { template: '<div>SocialPost</div>' },
        },
      },
      props: {
        loading: false,
        error: null,
        posts: [
          {
            id: '1',
            author: 'A',
            content: 'C',
            likes: 1,
            replies: 0,
            reposts: 0,
            timestamp: '2026-03-19T00:00:00Z',
          },
        ],
      },
    });
    expect(await screen.findByRole('heading', { name: es.social.title })).toBeTruthy();
    expect(await screen.findByText(es.social.description)).toBeTruthy();
  });
});
