import { test, expect } from '@playwright/test';

test.describe('My Trips Flow', () => {
  test('navigates to trips page and shows empty state or trips list', async ({ page }) => {
    await page.goto('/trips');
    await expect(page.locator('h1')).toContainText('My Trips');
    await expect(page.locator('text=Upcoming')).toBeVisible();
  });

  test('can navigate to create trip form', async ({ page }) => {
    await page.goto('/trips/new');
    await expect(page.locator('h1')).toContainText('Plan a New Trip');
    await expect(page.locator('button:has-text("Japan")')).toBeVisible();
  });
});
