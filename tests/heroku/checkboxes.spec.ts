import { test, expect } from '@playwright/test';
import { before } from 'node:test';

test('Checkbox 1 is checked', async ({ page }) => {
  await page.goto('/checkboxes');
  // await page.getByRole('checkbox').first().check();
  await page.locator("form#checkboxes input").nth(0).check();
  await expect(page.getByRole('checkbox').first()).toBeChecked();
});

test('Checkbox 2 is checked', async ({ page }) => {
  await page.goto('/checkboxes');
  await page.getByRole('checkbox').nth(1).check();
  
  await expect(page.getByRole('checkbox').nth(1)).toBeChecked();
});

