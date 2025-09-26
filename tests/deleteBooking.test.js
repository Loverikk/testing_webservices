const request = require('supertest')
const { bookingData } = require('../test-data/data')
const { createBooking, getToken, deleteBooking, getBookingById } = require('../utils/utils')


describe('DELETE /booking/:id', () => {
    const api = request(process.env.BASE_URL)
    let token;

    beforeAll(async () => {
        token = (await getToken(api)).body.token
    })

    afterAll(async () => {
        token = null
    })

    test('Should delete an existing booking', async () => {
        bookingId = (await createBooking(api, bookingData)).body.bookingid
        const deletedBookingResponse = await deleteBooking(api, bookingId, token)

        expect(deletedBookingResponse.statusCode).toBe(201)
        const oldBookingResponse = await getBookingById(api, bookingId)
        expect(oldBookingResponse.statusCode).toBe(404)
    })
})