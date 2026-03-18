import { expect, test } from '@playwright/test'

test.describe('performance smoke', () => {
  test('loads weather tab under basic timing threshold', async ({ page }) => {
    const startedAt = Date.now()

    await page.goto('/tabs/tab3')
    await expect(page.getByRole('heading', { name: 'Weather' })).toBeVisible()

    const elapsedMs = Date.now() - startedAt

    expect(elapsedMs).toBeLessThan(4_500)
  })
})
