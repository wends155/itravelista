import { test, expect } from '@playwright/test';

test.describe('Visa Assistant Flow', () => {
  test('lists visa countries and searches for Japan', async ({ page }) => {
    await page.goto('/visa');
    await expect(page.locator('h1')).toContainText('Visa Assistant');
    await expect(page.locator('text=Japan')).toBeVisible();
    await expect(page.locator('text=South Korea')).toBeVisible();
  });

  test('navigates to Japan visa detail page', async ({ page }) => {
    await page.goto('/visa/JP');
    await expect(page.locator('h1')).toContainText('Japan Visa Guide');
    await expect(page.locator('text=Valid Passport')).toBeVisible();
  });
});
