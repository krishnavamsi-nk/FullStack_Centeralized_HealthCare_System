const request = require('supertest')

const { app } = require('../server.js')

const Hospitals = require("../models/hospitals.js")

jest.mock("../models/hospitals.js")

describe("get all hospitals", (done) => {
    test('get all hospitals', async () => {
        const response = await request(app)
            .get("/gethospitals");
        expect(response.status).toBe(200);
    })
})