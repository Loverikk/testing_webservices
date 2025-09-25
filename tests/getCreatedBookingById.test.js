require('dotenv').config()
const request = require('supertest')
const { bookingData } = require('../test-data/data')
const { createBooking, getToken, deleteBooking, getBookingById } = require('../utils/utils')


describe('GET /booking/:id', () => {
    const api = request(process.env.BASE_URL)

    test('Should return an existing booking', async () => {
        const token = (await getToken(api)).body.token
        const bookingResponse = await createBooking(api, bookingData)
        const bookingId = bookingResponse.body.bookingid
        const fetchedBookingById = await getBookingById(api, bookingId)

        expect(fetchedBookingById.statusCode).toBe(200)
        expect(fetchedBookingById.body).toMatchObject(bookingResponse.body.booking)

        await deleteBooking(api, bookingId, token)
    })
})