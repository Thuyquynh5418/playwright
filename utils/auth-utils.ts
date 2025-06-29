import { APIRequestContext } from '@playwright/test';

export async function authToken(request: APIRequestContext) {
    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
        data: {
        username: 'admin',
        password: 'password123'
        }
    });
    
    if (response.status() !== 200) {
        throw new Error(`Failed to authenticate, status code: ${response.status()}`);
    }
    
    const responseData = await response.json();
    
    if (!responseData.token) {
        throw new Error('Authentication token not found in response');
    }
    
    return responseData.token;
}