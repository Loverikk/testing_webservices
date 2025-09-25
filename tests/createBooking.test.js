require('dotenv').config()
const request = require('supertest')
const { bookingData, brokenBookingData } = require('../test-data/data')
const { createBooking, getToken, deleteBooking } = require('../utils/utils')

describe('POST /booking', () => {
    const api = request(process.env.BASE_URL)

    describe('Positive testing', () => {
        test('It should place a new booking and return its ID', async () => {
            const token = (await getToken(api)).body.token
            const response = await createBooking(api, bookingData)
            const bookingId = response.body.bookingid

            expect(response.statusCode).toBe(200)
            expect(bookingId).toBeDefined()
            expect(response.body.booking).toMatchObject(bookingData)

            await deleteBooking(api, bookingId, token)
        })
    })

    describe('Negative testing', () => {
        test('It should return 500 error if we do not pass all parameters', async () => {
            const response = await createBooking(api, brokenBookingData)
            expect(response.statusCode).toBe(500)
        })
    })
})