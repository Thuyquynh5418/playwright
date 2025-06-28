import { test, expect } from '@playwright/test';

test('Vietnam Airlines - select one way and depart date', async ({ page }) => {
    await page.goto('https://www.vietnamairlines.com/vn/vi/home');
    await page.getByRole("button", { name: "Đồng ý" }).click();
    await page.getByRole("textbox", { name: "Từ" }).click();
    await page.getByRole("link", { name: "Tp. Hồ Chí Minh (SGN), Việt Nam" }).click();
    await page.getByRole("textbox", { name: "Đến" }).click();
    await page.getByRole("link", { name: "Hà Nội (HAN), Việt Nam" }).click();

    await page.getByRole("textbox", { name: "Ngày đi" }).click();
    // Get today's date
    const today = new Date();
    const currentDate = today.getDate().toString();
    const currentMonth = (today.getMonth() + 1).toString();
    const currentYear = today.getFullYear();
    console.log(currentDate, currentMonth, currentYear);
    
    await page.getByRole("table")
        .nth(0)
        .getByRole("link", { name: currentDate })
        .click();
    const confirmBtn = page.getByRole("button", { name: 'Chọn', exact: true });
    await expect(confirmBtn).toBeEnabled();
    await confirmBtn.click();

    await page.getByRole("button", { name: "Ngày đi" }).click();
    await page.getByRole("table")
        .nth(0)
        .getByRole("link", { name: currentDate + 1}).click();
    await confirmBtn.click();

    const departureDate = await page.getByRole("textbox", { name: "Ngày đi" }).inputValue();
    expect(departureDate).toBe(`${currentDate}/${currentMonth}/${currentYear}`);
    const returnDate = await page.getByRole("textbox", { name: "Ngày về" }).inputValue();
    const nextDay = (today.getDate() + 1).toString().padStart(2, '0');
    expect(returnDate).toBe(`${nextDay}/${currentMonth}/${currentYear}`);


});

// test('Vietnam Airlines - select one way and depart date', async ({ page }) => {
//     await page.goto('https://www.vietnamairlines.com/vn/vi/home');

//     await page.getByRole('button', { name: 'Đồng ý' }).click();   
//     await page.locator('#city-to-roundtrip').click();
//     await page.getByRole('link', { name: 'Hà Nội (HAN)' }).click();

//     const today = new Date();
//     const currentDate = today.getDate().toString().padStart(2, '0');
//     const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
//     const currentYear = today.getFullYear();
//     console.log(currentDate);
//     await page.getByRole('table')
//         .nth(0)
//         .getByRole('link', {name: currentDate})
//         .click();
    
//     //await page.getByRole('link', { name: 'Một chiều' }).click();
//     const departureDate = await page.getByRole('textbox', { name: 'Ngày đi' }).inputValue();
//     await expect(departureDate).toBe(`${currentDate}/${currentMonth}/${currentYear}`)
// });