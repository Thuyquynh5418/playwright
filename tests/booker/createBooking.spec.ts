import { test, expect, APIRequestContext } from '@playwright/test';
import { z } from 'zod';
import { createBooking } from '../../utils/booking-utils';

test ('Test Create booking response 201', async ({ request }) => {
    const {response, responseData } = await createBooking(request);
    expect(response.status()).toBe(200);
    const bookingSchema = z.object({
        bookingid: z.number(),
        booking: z.object({
            firstname: z.string(),
            lastname: z.string(),
            totalprice: z.number(),
            depositpaid: z.boolean(),
            bookingdates: z.object({
                checkin: z.string(),
                checkout: z.string()
            }),
            additionalneeds: z.string()
        }),
        
    });
    expect(() => bookingSchema.parse(responseData)).not.toThrow();
});

test('Test Create booking response 200', async ({ request }) => {
    //Data for booking
    const bookingData = {
        firstname: 'Quynh',
        lastname: 'Pham',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: '2025-06-14',
            checkout: '2025-06-15'
        },
        additionalneeds: 'Breakfast'
    };

    //Post request to create booking
    const response = await request.post('https://restful-booker.herokuapp.com/booking',
        {
            data: bookingData,
            headers: {
                'Content-Type': 'application/json'
        }
    }
    );

    //Assert the response status and structure
    expect(response.status()).toBe(200);
    const responseData = await response.json();

    const bookingSchema = z.object({
        bookingid: z.number(),
        booking: z.object({
            firstname: z.string(),
            lastname: z.string(),
            totalprice: z.number(),
            depositpaid: z.boolean(),
            bookingdates: z.object({
                checkin: z.string(),
                checkout: z.string()
            }),
            additionalneeds: z.string()
        }),
        
    });
    expect(() => bookingSchema.parse(responseData)).not.toThrow();
});

test('Test Create booking response 500', async ({ request }) => {
    //firstname is missing
    const bookingData = {
        // firstname: '',
        lastname: "Pham",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: '2025-06-14',
            checkout: '2025-06-15'
        },
        additionalneeds: 'Breakfast'
    };

    //Post request to create booking
    const response = await request.post('https://restful-booker.herokuapp.com/booking',
        {
            data: bookingData,
            headers: {
                'Content-Type': 'application/json'
        }
    }
    );

    //Assert the response status and structure
    expect(response.status()).toBe(500);
    console.log('Response Data:', response);
    const responseText = await response.text();
    // expect(responseText).toContain('Internal Server Error');
});