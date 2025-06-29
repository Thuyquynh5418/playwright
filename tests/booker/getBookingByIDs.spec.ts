import { test, expect } from '@playwright/test';
import { z } from 'zod';

test ('test get booking ID', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking');
    expect(response.status()).toBe(200);
    const responseData = await response.json();
    console.log('Response Data:', responseData);

    const bookingSchema = z.array(
        z.object({
            bookingid: z.number()
        })
    );
    expect(() => bookingSchema.parse(responseData)).not.toThrow();
});

test ('test get booking', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking/1');
    expect(response.status()).toBe(200);
    const responseData = await response.json();
    console.log('Response Data:', responseData);

    const bookingSchema = z.object({
        firstname: z.string(),
        lastname: z.string(),
        totalprice: z.number(),
        depositpaid: z.boolean(),
        bookingdates: z.object({
            checkin: z.string(),
            checkout: z.string()
        }),
    });
    expect(() => bookingSchema.parse(responseData)).not.toThrow();
});