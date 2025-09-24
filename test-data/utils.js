async function getBookingId(api, bookingData) {
    const response = await api
        .post('/booking')
        .set('Accept', 'application/json')
        .send(bookingData);

    expect(response.statusCode).toBe(200);
    expect(response.body.bookingid).toBeDefined();
    return response.body.bookingid;
}

module.exports = getBookingId