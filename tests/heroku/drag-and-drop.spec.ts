import { test, expect } from '@playwright/test';

// test('Drag and drop', async ({ page }) => {
//     await page.goto('/drag_and_drop');
    
//     const source = page.locator('#column-a');
//     const target = page.locator('#column-b');

//     // Get the initial text of the source and target elements
//     const initialSourceText = await source.textContent();
//     const initialTargetText = await target.textContent();

//     // Perform drag and drop
//     await source.dragTo(target);

//     // Verify the text has been swapped
//     const finalSourceText = await source.textContent();
//     const finalTargetText = await target.textContent();

//     expect(finalSourceText).toBe(initialTargetText);
//     expect(finalTargetText).toBe(initialSourceText);
// });


test('drag and drop', async ({ page }) => {
  // Go to the drag and drop page
  await page.goto('/drag_and_drop');

  await page.locator('#column-a').dragTo(page.locator('#column-b'));

  const colA_AfterDrag = await page.locator('#column-a').textContent();
  await expect(colA_AfterDrag).toBe('B');
});
