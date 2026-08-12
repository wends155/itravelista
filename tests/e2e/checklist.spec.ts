import { test, expect } from '@playwright/test';

test.describe('Smart Checklist Flow', () => {
  test('navigates to checklist page', async ({ page }) => {
    await page.goto('/checklist');
    await expect(page.locator('h1')).toBeVisible();
  });
});
