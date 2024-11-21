const request = require('supertest')

const { app } = require('../server.js')

const Appointments = require("../models/appointments.js")

jest.mock("../models/appointments.js")

describe("get all Appointments", (done) => {
    test('get all Appointments', async () => {
        const response = await request(app)
            .get("/getappointments");
        expect(response.status).toBe(200);
    })
})