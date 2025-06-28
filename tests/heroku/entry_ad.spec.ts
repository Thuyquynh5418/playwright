import {test, expect} from '@playwright/test';

test('verify entry ad content', async ({page}) => {

    await page.addLocatorHandler(
        page.getByRole('heading', { name: 'THIS IS A MODAL WINDOW' }),
        async () => {
            await page.getByText('Close', {exact: true}).click(); // Close the entry ad if it appears  
        }
    );

    await page.goto('/entry_ad');

    // Wait for the modal to appear
    await page.waitForSelector('.modal-title', {state: 'visible'}); // Wait for the body to load
    await expect(page.getByRole('heading', { name: 'THIS IS A MODAL WINDOW' })).toBeVisible(); // Verify the modal window is visible

    //Close the modal window manually
    await page.getByText('Close', {exact: true}).click(); // Click the close button to close the modal window
    
    //Verify Click here link is visible
    await expect(page.getByRole('link', {name: 'click here'})).toBeVisible(); // Verify the link is visible
    await page.getByRole('link', {name: 'click here'}).click(); // Click the link
    
    
});