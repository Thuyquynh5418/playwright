import { test, expect } from '@playwright/test';
import { z } from 'zod';
import { createBooking } from '../../utils/booking-utils';
import { authToken } from '../../utils/auth-utils';

let initialBookingId: number;

test.beforeEach('Create booking', async ({ request }) => {
    const {response, responseData, bookingId } = await createBooking(request);
    expect(response.status()).toBe(200);
    initialBookingId = bookingId;
});

test('Update booking', async ({ request }) => {
    
    // Data for updating booking
    const updatedBookingData = {
        firstname: 'UpdatedFirstName',
        lastname: 'UpdatedLastName',
        totalprice: 200,
        depositpaid: true,
        bookingdates: {
            checkin: '2025-06-20',
            checkout: '2025-06-21'
        },
        additionalneeds: 'Late check-out'
    };
    // Put request to update booking
    const token = await authToken(request);
    const updatedResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${initialBookingId}`, {
        data: updatedBookingData,
        headers: {
                'Content-Type': 'application/json',
                Cookie: `token=${token}`
            }
    });

    // Assert the response status and structure
    expect(updatedResponse.status()).toBe(200);
    const responseData = await updatedResponse.json();

    const bookingSchema = z.object({
        firstname: z.string(),
        lastname: z.string(),
        totalprice: z.number(),
        depositpaid: z.boolean(),
        bookingdates: z.object({
            checkin: z.string(),
            checkout: z.string()
        }),
        additionalneeds: z.string()
    });
    
    expect(() => bookingSchema.parse(responseData)).not.toThrow();
    expect(responseData.firstname).toBe(updatedBookingData.firstname);
    expect(responseData.lastname).toBe(updatedBookingData.lastname);
    expect(responseData.totalprice).toBe(updatedBookingData.totalprice);
    expect(responseData.depositpaid).toBe(updatedBookingData.depositpaid);
    expect(responseData.bookingdates.checkin).toBe(updatedBookingData.bookingdates.checkin);
    expect(responseData.bookingdates.checkout).toBe(updatedBookingData.bookingdates.checkout);
    expect(responseData.additionalneeds).toBe(updatedBookingData.additionalneeds);
});
