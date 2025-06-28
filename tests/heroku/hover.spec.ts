import { test, expect } from '@playwright/test';

test('Hover over elements', async ({ page }) => {
    await page.goto('/hovers');
    await page.getByRole('img', {name: 'User Avatar'}).first().hover();
    await expect(page.getByText('name: user1')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'name: user1' })).toBeVisible();

});