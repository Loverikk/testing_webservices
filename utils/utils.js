async function getToken(api) {
    return api
        .post('/auth')
        .send({
            username: process.env.USERNAME,
            password: process.env.PASSWORD
        })
}

async function createBooking(api, bookingData) {
    return api
        .post('/booking')
        .set('Accept', 'application/json')
        .send(bookingData)
}

async function updateBooking({ api, id, newBookingData, token }) {
    return api
        .put(`/booking/${id}`)
        .set('Accept', 'application/json')
        .set('Cookie', `token=${token}`)
        .send(newBookingData)
}

async function getBookingById(api, id) {
    return api
        .get(`/booking/${id}`)
        .set('Accept', 'application/json')
}

async function deleteBooking(api, id, token) {
    return api
        .delete(`/booking/${id}`)
        .set('Cookie', `token=${token}`)
}

module.exports = {
    getToken,
    createBooking,
    deleteBooking,
    updateBooking,
    getBookingById
}