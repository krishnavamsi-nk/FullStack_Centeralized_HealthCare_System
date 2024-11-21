const request = require('supertest')

const { app } = require('../server.js')

const Doctors = require("../models/doctors.js")

jest.mock("../models/doctors.js")

describe("get all doctors", (done) => {
    test('get all doctors',async()=>{
        const response = await request(app)
            .get("/getdoctors");
        expect(response.status).toBe(200);
    })
})