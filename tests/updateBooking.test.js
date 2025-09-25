require('dotenv').config()
const request = require('supertest')
const { bookingData, newBookingData } = require('../test-data/data')
const { createBooking, getToken, deleteBooking, updateBooking } = require('../utils/utils')


describe('PUT /booking/:id', () => {
    const api = request(process.env.BASE_URL)

    test('Should update an existing booking', async () => {
        const token = (await getToken(api)).body.token
        const originalBookingResponse = await createBooking(api, bookingData)
        const bookingId = originalBookingResponse.body.bookingid
        const updatedBookingResponse = await updateBooking({
            api,
            id: bookingId,
            newBookingData,
            token
        })

        expect(updatedBookingResponse.statusCode).toBe(200)
        expect(updatedBookingResponse.body.firstname).toBe(newBookingData.firstname)
        expect(updatedBookingResponse.body.lastname).toBe(newBookingData.lastname)

        await deleteBooking(api, bookingId, token)
    })
})