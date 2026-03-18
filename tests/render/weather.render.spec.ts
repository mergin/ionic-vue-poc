import { render, screen } from '@testing-library/vue'
import { createPinia } from 'pinia'
import { describe, expect, test } from 'vitest'
import { http, HttpResponse } from 'msw'

import Tab3Page from '@/views/Tab3Page.vue'
import { i18n } from '@/core/i18n'
import { mswServer } from '../msw-server'

describe('Weather render', () => {
  test('renders weather data from MSW handlers', async () => {
    // ARRANGE
    const pinia = createPinia()

    // ACT
    render(Tab3Page, {
      global: {
        plugins: [pinia, i18n],
      },
    })

    // ASSERT
    expect(await screen.findByRole('heading', { name: 'Weather' })).toBeTruthy()
    expect(await screen.findByText('Humidity: 42%')).toBeTruthy()
    expect(await screen.findByText('Wind: 18 km/h')).toBeTruthy()
  })

  test('renders error state and retry button when service fails', async () => {
    // ARRANGE
    mswServer.use(
      http.get('/api/weather', () => {
        return HttpResponse.json({ message: 'down' }, { status: 500 })
      }),
    )
    const pinia = createPinia()

    // ACT
    render(Tab3Page, {
      global: {
        plugins: [pinia, i18n],
      },
    })

    // ASSERT
    expect(await screen.findByRole('alert')).toBeTruthy()
    expect(await screen.findByText('Retry')).toBeTruthy()
  })

  test('renders weather heading in Spanish locale', async () => {
    // ARRANGE
    const pinia = createPinia()
    i18n.global.locale.value = 'es'

    // ACT
    render(Tab3Page, {
      global: {
        plugins: [pinia, i18n],
      },
    })

    // ASSERT
    expect(await screen.findByRole('heading', { name: 'Clima' })).toBeTruthy()

    // CLEANUP
    i18n.global.locale.value = 'en'
  })
})
