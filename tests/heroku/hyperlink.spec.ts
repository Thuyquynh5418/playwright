import { test, expect } from '@playwright/test';

test('TC04: Hyperlink - link text navigation', async ({ page }) => {
  await page.goto('/status_codes');

  // 200
//   await page.getByRole('link', { name: '200' }).click();
//   await expect(page).toHaveURL(/status_codes\/200/);
//   await page.click('text=here');

  // 301
  await page.getByRole('listitem').filter({hasText: '301'}).getByRole('link').click();
  //await page.getByRole('link', { name: '301' }).click();
  await expect(page).toHaveURL(/status_codes\/301/);
  //await page.click('text=here');
  //await page.getByRole('link', { name: 'here' }).click();
  await page.goBack();

  // 404
//   await page.getByRole('link', { name: '404' }).click();
//   await expect(page).toHaveURL(/status_codes\/404/);
//   await page.click('text=here');

//   // 500
//   await page.getByRole('link', { name: '500' }).click();
//   await expect(page).toHaveURL(/status_codes\/500/);
//   await page.click('text=here');
});