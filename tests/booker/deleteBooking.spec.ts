import { test, expect } from '@playwright/test';
import { z } from 'zod';
import { createBooking } from '../../utils/booking-utils';
import { authToken } from '../../utils/auth-utils';

let deleteBookingId: number;
test.beforeEach('Create booking', async ({ request }) => {
    const { response, responseData, bookingId } = await createBooking(request);
    expect(response.status()).toBe(200);
    deleteBookingId = bookingId;
});

test('Delete booking', async ({ request }) => {
    // Delete request to remove the booking
    const token = await authToken(request);
    const deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${deleteBookingId}`, {
        headers: {
            'Content-Type': 'application/json',
            Cookie: `token=${token}`
        }
    });

    // Assert the response status
    expect(deleteResponse.status()).toBe(201);

    // Verify that the booking is deleted by trying to retrieve it
    const getResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${deleteBookingId}`);
    expect(getResponse.status()).toBe(404);
});