import { test, expect } from '@playwright/test';

test.describe('Budget Planner Flow', () => {
  test('navigates to budget page', async ({ page }) => {
    await page.goto('/budget');
    await expect(page.locator('h1')).toBeVisible();
  });
});
