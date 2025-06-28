import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test('download multiple files', async ({page}) => {
    await page.goto('/download');
    const fileNames = ["test_upload.txt","demo.txt"];
    
   for (const fileName of fileNames) {
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.getByRole('link', { name: fileName }).first().click(),
        ]);
        
        const suggestedFilename = download.suggestedFilename();
        expect(suggestedFilename).toBe(fileName);
        
        const filePath = 'download/'+suggestedFilename;
        await download.saveAs(filePath);
        expect(fs.existsSync(filePath)).toBeTruthy();
    }
});
