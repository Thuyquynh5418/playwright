import { test, expect } from '@playwright/test';
test ('upload files', async ({ page }) => {
    await page.goto('/upload');
    
    // Upload a file
    const fileInput = 'upload-files/demo.txt';
    
    await page.getByRole('button', { name: 'Choose File' }).setInputFiles(fileInput);
    await page.getByRole('button', { name: 'Upload' }).click();
    
    // Verify the upload was successful
    // const uploadMessage = await page.locator('#uploaded-files').textContent();
    // expect(uploadMessage).toContain('demo.txt');
    expect(await page.locator('#uploaded-files').textContent()).toContain('demo.txt');
});