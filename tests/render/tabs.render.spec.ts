import { render, screen } from '@testing-library/vue'
import { createPinia } from 'pinia'
import { describe, expect, test } from 'vitest'

import Tab1Page from '@/views/Tab1Page.vue'
import { i18n } from '@/core/i18n'

describe('Tab1Page render', () => {
  test('renders social feature title', async () => {
    // ARRANGE
    const pinia = createPinia()

    // ACT
    render(Tab1Page, {
      global: {
        plugins: [pinia, i18n],
      },
    })

    // ASSERT
    expect(await screen.findByRole('heading', { name: 'Social Media' })).toBeTruthy()
  })
})
