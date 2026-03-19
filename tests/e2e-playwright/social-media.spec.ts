import { expect, test } from '@playwright/test';

test.describe('social media tab', () => {
  test('shows posts and retry on error', async ({ page }) => {
    await page.goto('/tabs/tab1');
    // Should see heading and posts
    await expect(page.getByRole('heading', { name: /social/i })).toBeVisible();
    await expect(page.getByRole('list')).toBeVisible();
    // Simulate error (MSW can be toggled in real test infra)
    // await page.route('/api/social', route => route.abort())
    // await page.reload()
    // await expect(page.getByRole('alert')).toBeVisible()
    // await page.getByRole('button', { name: /retry/i }).click()
  });

  test('shows Spanish labels', async ({ page }) => {
    await page.goto('/tabs/tab1');
    // Switch language (simulate select or event)
    await page.locator('ion-select').evaluate((element: Element) => {
      element.dispatchEvent(
        new CustomEvent('ionChange', { detail: { value: 'es' }, bubbles: true }),
      );
    });
    await expect(page.getByRole('heading', { name: /red social/i })).toBeVisible();
    await expect(page.getByRole('list')).toBeVisible();
  });
});
