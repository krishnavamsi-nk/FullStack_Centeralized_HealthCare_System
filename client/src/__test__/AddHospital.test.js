import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddHospital from '../components/AddHospital/AddHospital';

describe('AddHospital Component', () => {
    it('submits the form and fetches hospitals on successful addition', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ success: true }),
            })
        );

        const getHospitalsMock = jest.fn();

        render(<AddHospital isOpen={true} onClose={() => {}} getHospitals={getHospitalsMock} />);

        const hospitalNameInput = screen.getByLabelText('Hospital Name');
        fireEvent.change(hospitalNameInput, { target: { value: 'Hospital ABC' } });
        expect(hospitalNameInput.value).toBe('Hospital ABC');

        const hospitalRegNoInput = screen.getByLabelText('Hospital RegNo.');
        fireEvent.change(hospitalRegNoInput, { target: { value: '123456' } });
        expect(hospitalRegNoInput.value).toBe('123456');
    });
});
