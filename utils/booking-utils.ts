// utils/booking-utils.ts
import { APIRequestContext } from '@playwright/test';

export async function createBooking(request: APIRequestContext) {
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

  const response = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: bookingData,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const responseData = await response.json();

  return {
    response,
    responseData,
    bookingId: responseData.bookingid,
    booking: responseData.booking
  };
}