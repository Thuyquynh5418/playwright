import { test, expect } from '@playwright/test';

test('create authen token', async ({ request }) => {
    await request.post('https://restful-booker.herokuapp.com/auth', {data: {
        username: 'admin',
        password: 'password123'
    }}).then(async response => {
        expect(response.status()).toBe(200);
        const responseData = await response.json();
        expect(responseData).toHaveProperty('token');
        expect(responseData.token).toBeDefined();
        console.log('Token:', responseData.token);
    });
});

test('get error with invalid credentials', async ({ request }) => {
    await request.post('https://restful-booker.herokuapp.com/auth', {data: {
        username: 'admin',
        password: 'password123_invalid'
    }}).then(async response => {
        expect(response.status()).toBe(200);
        const responseData = await response.json();
        expect(responseData.reason).toBe('Bad credentials');
    });
});