import { expect, test } from '@playwright/test';

test.describe('tabs navigation', () => {
  test('navigates through all feature tabs', async ({ page }) => {
    await page.goto('/tabs/tab1');

    await expect(page.getByRole('heading', { name: 'Social Media' })).toBeVisible();

    await page.getByRole('tab', { name: 'Image Gallery' }).click();
    await expect(page.getByRole('heading', { name: 'Image Gallery' })).toBeVisible();

    await page.getByRole('tab', { name: 'Weather' }).click();
    await expect(page.getByRole('heading', { name: 'Weather' })).toBeVisible();
  });
});
