require('dotenv').config()

const request = require('supertest')
const { bookingData, newNameAndLastName } = require('../test-data/data')
const getBookingId = require('../test-data/utils')

describe('Testing API', () => {
    const api = request(process.env.BASE_URL)
    let token;
    let bookingId;

    beforeAll(async () => {
        const response = await api
            .post('/auth')
            .send({
                username: process.env.USERNAME,
                password: process.env.PASSWORD
            })

        token = response.body.token
    })

    afterEach(async () => {
        if (bookingId) {
            await api.delete(`/booking/${bookingId}`).set('Cookie', `token=${token}`);
            bookingId = null
        }
    })

    afterAll(() => {
        token = null;
    })

    test('GET /booking/:id should return the required booking', async () => {
        bookingId = await getBookingId(api, bookingData)
        const response = await api
            .get(`/booking/${bookingId}`)
            .set('Accept', 'application/json')

        expect(response.headers['content-type']).toContain('application/json')
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject(bookingData)
    })

    test('PUT /booking/:id should update the existing booking', async () => {
        bookingId = await getBookingId(api, bookingData)
        const response = await api
            .put(`/booking/${bookingId}`)
            .set('Cookie', `token=${token}`)
            .set('Accept', 'application/json')
            .send({
                ...bookingData,
                firstname: newNameAndLastName.firstName,
                lastname: newNameAndLastName.lastName
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.firstname).toBe(newNameAndLastName.firstName)
        expect(response.body.lastname).toBe(newNameAndLastName.lastName)
    })

    test('DELETE /booking/:id should delete the booking', async () => {
        bookingId = await getBookingId(api, bookingData)
        const response = await api
            .delete(`/booking/${bookingId}`)
            .set('Cookie', `token=${token}`)

        expect(response.statusCode).toBe(201)
        const getAfterDelete = await api.get(`/booking/${bookingId}`);
        expect(getAfterDelete.statusCode).toBe(404)

        bookingId = null
    })
})