import {test, expect} from '@playwright/test';
test('horizontal slider', async ({page}) => {
    await page.goto("/horizontal_slider");

    // Verify the initial value of the slider
    const slider = page.locator('.sliderContainer input');
    await expect(slider).toHaveValue('0');

    // // Move the slider to 3.5
    // await slider.fill('3.5');
    const range = 3.5;

    while (parseFloat(await slider.inputValue()) < range) {
        await slider.press('ArrowRight');
    }
    
    // Verify the value has changed to 3.5
    await expect(slider).toHaveValue('3.5');
});
