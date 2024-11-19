const request = require('supertest');
const { app } = require('../server'); 
const Patients = require('../models/patients'); 

jest.mock('../models/patients');

describe('POST /addpatient', () => {
    it('responds with 200 status and saves the patient', async () => {
        const newPatient = {
            name: 'John Doe',
            email: 'johndoe@example.com',
        };

        Patients.prototype.save.mockResolvedValue();

        const response = await request(app)
            .post('/addpatient')
            .send(newPatient);

        expect(response.status).toBe(200);

        expect(Patients.prototype.save).toHaveBeenCalled();
    }, 10000);

});
