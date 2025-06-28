import { test, expect } from '@playwright/test';

test('Infinite scroll', async ({ page }) => {
    await page.goto('/infinite_scroll');
    for (let i = 0; i < 10; i++) {
        // Scroll down to the bottom of the page
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        
        await page.mouse.wheel(0, 1000); // Scroll down by 1000 pixels
        // Wait for new content to load
        await page.waitForTimeout(1000); // Adjust timeout as necessary
    }
    // await page.getByText('Powered by Infinite Scroll').scrollIntoViewIfNeeded();
    // await expect(page.getByText('Powered by Infinite Scroll')).toBeVisible();
});