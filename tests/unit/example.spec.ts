import { mount } from '@vue/test-utils';
import Tab1Page from '@/views/Tab1Page.vue';
import { describe, expect, test } from 'vitest';
import { createPinia } from 'pinia';

import { i18n } from '@/core/i18n';

describe('Tab1Page.vue', () => {
  test('renders social media title', () => {
    // ARRANGE
    const pinia = createPinia();

    // ACT
    const wrapper = mount(Tab1Page, {
      global: {
        plugins: [pinia, i18n],
      },
    });

    // ASSERT
    expect(wrapper.text()).toContain('Social Media');
  });
});
