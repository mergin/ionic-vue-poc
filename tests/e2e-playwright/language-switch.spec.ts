import { expect, test } from '@playwright/test';

test.describe('language switching', () => {
  test('switches tab labels and header text to Spanish', async ({ page }) => {
    await page.goto('/tabs/tab3');

    await expect(page.getByRole('heading', { name: 'Weather' })).toBeVisible();

    await page.locator('ion-select').evaluate((element: Element) => {
      element.dispatchEvent(
        new CustomEvent('ionChange', { detail: { value: 'es' }, bubbles: true }),
      );
    });

    await expect(page.getByRole('heading', { name: 'Clima' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Galeria' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Red Social' })).toBeVisible();
  });
});
