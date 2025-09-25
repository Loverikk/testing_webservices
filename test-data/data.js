const bookingData = {
    "firstname": "Bruce",
    "lastname": "Yellow",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2025-09-25",
        "checkout": "2025-09-30"
    },
    "additionalneeds": "Breakfast"
}

const brokenBookingData = {
    "lastname": "Yellow",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2025-09-25",
        "checkout": "2025-09-30"
    },
    "additionalneeds": "Breakfast"
}

const newBookingData = {
    "firstname": "Mike",
    "lastname": "Tyson",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2025-09-25",
        "checkout": "2025-09-30"
    },
    "additionalneeds": "Breakfast"
}

module.exports = {
    bookingData,
    brokenBookingData,
    newBookingData
}