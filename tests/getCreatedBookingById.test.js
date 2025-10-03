const request = require('supertest');
const { bookingData } = require('../test-data/data');
const { createBooking, getToken, deleteBooking, getBookingById } = require('../utils/utils');

describe('GET /booking/:id', () => {
  const api = request(process.env.BASE_URL);
  let token;
  let bookingId;

  beforeAll(async () => {
    token = (await getToken(api)).body.token;
  });

  beforeEach(() => {
    bookingId = null;
  });

  afterEach(async () => {
    if (bookingId) {
      await deleteBooking(api, bookingId, token);
    }
  });

  afterAll(() => {
    token = null;
  });

  test('Should return an existing booking', async () => {
    const bookingResponse = await createBooking(api, bookingData);
    bookingId = bookingResponse.body.bookingid;
    const fetchedBookingById = await getBookingById(api, bookingId);

    expect(fetchedBookingById.statusCode).toBe(200);
    expect(fetchedBookingById.body).toMatchObject(bookingResponse.body.booking);
  });
});
