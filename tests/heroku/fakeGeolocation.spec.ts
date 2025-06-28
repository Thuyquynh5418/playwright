import { test, expect } from '@playwright/test';

test.use({
    geolocation: { latitude: 37.7749, longitude: -122.4194 }, // San Francisco coordinates
    permissions: ['geolocation'],
});

test('fake geolocation', async ({page}) => {
    await page.goto('/geolocation');
    await page.getByRole('button', { name: 'Where am I?' }).click();

    await expect(page.locator('#lat-value')).toHaveText('37.7749');
    await expect(page.locator('#long-value')).toHaveText('-122.4194');
});
