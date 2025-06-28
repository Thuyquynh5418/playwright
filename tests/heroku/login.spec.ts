import { test, expect } from '@playwright/test';

const dataSet = [{
    username: 'tomsmith', 
    password: 'SuperSecretPassword!',
    expectedUrl: 'https://the-internet.herokuapp.com/secure',
    flashMessage: 'You logged into a secure area!'
},
    
{ 
    username: 'invalidUser',
    password: 'invalidPassword',
    expectedUrl: 'https://the-internet.herokuapp.com/secure',
    flashMessage: 'Your username is invalid!'
},
{ 
    username: 'tomsmith',
    password: '',
    expectedUrl: 'https://the-internet.herokuapp.com/secure', 
    flashMessage: 'Your password is invalid!'
},
{ 
    username: '',
    password: 'SuperSecretPassword!',
    expectedUrl: 'https://the-internet.herokuapp.com/secure', 
    flashMessage: 'Your username is invalid!'
},
{ 
    username: '',
    password: '',
    expectedUrl: 'https://the-internet.herokuapp.com/secure', 
    flashMessage: 'Your username is invalid!'
},
];

dataSet.forEach( data => {
    test(`login with username: ${data.username} and password: ${data.password}`, async ({ page }) => {
        await page.goto("/login");
        await page.getByRole('textbox', { name: 'Username' }).fill(data.username);
        await page.locator('input[name="password"]').fill(data.password);
        await page.getByRole('button', { name: 'Login' }).click();

        if (data.username === 'tomsmith' && data.password === 'SuperSecretPassword!') {
            // Verify successful login
            await expect(page).toHaveURL(data.expectedUrl);
            await expect(page.getByText(data.flashMessage)).toBeVisible();
        } else {
            // Verify failed login
            await expect(page.getByText(data.flashMessage)).toBeVisible();
        }
    });
} );
