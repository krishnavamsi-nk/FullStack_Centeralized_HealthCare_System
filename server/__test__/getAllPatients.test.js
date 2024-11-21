const request = require('supertest')

const { app } = require('../server.js')

const Patients = require("../models/patients.js")

jest.mock("../models/patients.js")

describe("get all patients", (done) => {
    test('get all patients',async()=>{
        const response = await request(app)
            .get("/getpatients");
        expect(response.status).toBe(200);
    })
})