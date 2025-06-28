import { test, expect } from '@playwright/test';
import { z } from 'zod';

test ('test get booking', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking/1');
    expect(response.status()).toBe(200);
    const responseData = await response.json();
});

test ('test get booking by id', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking/1');
    expect(response.status()).toBe(200);
    const responseData = await response.json();

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