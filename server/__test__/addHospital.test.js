const request = require('supertest');
const { app } = require('../server');
const Hospital = require('../models/hospitals');

jest.mock('../models/hospitals');

describe('POST /addHospital', () => {
    it('responds with 200 status and saves the hospital', async () => {
        const newHospital = {
            name: 'hospital 1',
            email: 'hospital1@gmail.com',
        };

        Hospital.prototype.save.mockResolvedValue();

        const response = await request(app)
            .post('/addhospital')
            .send(newHospital);

        expect(response.status).toBe(200);

        expect(Hospital.prototype.save).toHaveBeenCalled();
    }, 10000);

});
