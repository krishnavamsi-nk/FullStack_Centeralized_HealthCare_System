const request = require('supertest')

const { app } = require('../server')

describe('testing api is live', () => {
    test('checking api is live', done => {
        request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done()
            })
    })
})