import {test, expect} from '@playwright/test';

test('Verify dynamic loading', async ({page}) => {
    await page.goto('/dynamic_loading/1');
    
    // Click the start button
    await page.getByRole('button', { name: 'Start' }).click();
    // await expect(page.locator('#loading')).toBeVisible();
    
    // const finishText = page.locator('#finish h4');
    // await expect(finishText).toHaveText('Hello World!');
    // await expect(page.getByRole('heading', { name: 'Hello World!' })).toBeVisible({timeout: 5000});
    await expect(page.getByText('Hello World!')).toBeVisible({timeout: 5000});
})