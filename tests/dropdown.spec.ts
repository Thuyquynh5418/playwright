import { test, expect } from '@playwright/test';

test('Dropdown selection', async ({ page }) => {
  await page.goto('/dropdown');

  // Select option by label
  await page.selectOption('select#dropdown', { label: 'Option 2' });
  await expect(page.locator('select#dropdown')).toHaveValue('2');
});

test('Select multiple options', async ({ page }) => {
  await page.goto('https://output.jsbin.com/osebed/2');
  
  await page.locator('#fruits').selectOption([]);
  await expect(page.locator('#fruits')).toHaveValues([]);

  await page
        .locator('#fruits')
        .selectOption(['apple', 'orange']);
  await expect(page.locator('#fruits')).toHaveValues(['apple', 'orange']);

//   await expect(page.locator('option[value=apple]')).toBeChecked();
//   await expect(page.locator('option[value=orange]')).toBeChecked();
    // Select multiple options

});