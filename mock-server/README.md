# MOCK DATA SERVER (For Front-end)

Steps to run:

- Install the dependencies: `npm install`
- Start the mock server: `npm start`

Default port: `4000`

URL: <http://localhost:4000>

- user sign up POST `/api/user/register`
- user sign in POST `/api/user/login`
- get all recording GET `/api/recording`
- get recording with id GET `/api/recording/{id}`
- add recording POST `/api/recording`
- delete recording with id DELETE `/api/recording/{id}`

> NOTE: if using "postman" to POST, make sure the header `Content-Type` is `application/json`
