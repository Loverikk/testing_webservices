require('dotenv').config()
const request = require('supertest')
const { getToken } = require('../utils/utils')

describe('POST /auth', () => {
    const api = request(process.env.BASE_URL)

    test('It should return a token', async () => {
        const response = await getToken(api)

        expect(response.statusCode).toBe(200)
        expect(response.body.token).toBeDefined()
        expect(response.header['content-type']).toContain('application/json')
    })
})