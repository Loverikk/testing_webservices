const request = require('supertest')
const { bookingData, newBookingData } = require('../test-data/data')
const { createBooking, getToken, deleteBooking, updateBooking } = require('../utils/utils')


describe('PUT /booking/:id', () => {
    const api = request(process.env.BASE_URL)
    let token;
    let bookingId

    beforeAll(async () => {
        token = (await getToken(api)).body.token
    })

    beforeEach(() => {
        bookingId = null
    })

    afterEach(async () => {
        if (bookingId) {
            await deleteBooking(api, bookingId, token)
        }
    })

    afterAll(() => {
        token = null
    })

    test('Should update an existing booking', async () => {
        const originalBookingResponse = await createBooking(api, bookingData)
        bookingId = originalBookingResponse.body.bookingid
        const updatedBookingResponse = await updateBooking({
            api,
            id: bookingId,
            newBookingData,
            token
        })

        expect(updatedBookingResponse.statusCode).toBe(200)
        expect(updatedBookingResponse.body.firstname).toBe(newBookingData.firstname)
        expect(updatedBookingResponse.body.lastname).toBe(newBookingData.lastname)
    })
})