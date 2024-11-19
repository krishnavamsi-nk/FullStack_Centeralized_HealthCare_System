import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import DoctorSignup from '../pages/auth/DoctorSignup';
import { act } from 'react-dom/test-utils';

describe('DoctorSignup Component', () => {
    it('submits the form and redirects to login page after successful registration', async () => {
        global.fetch = jest.fn();
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => render(<Router><DoctorSignup /></Router>))
        const nameInput = screen.getByPlaceholderText('Name');
        fireEvent.change(nameInput, { target: { value: 'saipranith' } });
        expect(nameInput.value).toBe('saipranith');

        const ageInput = screen.getByPlaceholderText('Age');
        fireEvent.change(ageInput, { target: { value: '25' } });
        expect(ageInput.value).toBe('25')

        const genderSelect = screen.getByLabelText('Gender:');
        fireEvent.change(genderSelect, { target: { value: 'male' } });
        expect(screen.getByText('Male').selected).toBe(true);

        const licenseNoInput = screen.getByPlaceholderText('License No');
        fireEvent.change(licenseNoInput, { target: { value: '123456' } });
        expect(licenseNoInput).toHaveValue('123456');

        const specialty = screen.getByLabelText('Specialty')
        fireEvent.change(specialty, { target: { value: 'Gastroenterologist' } });
        expect(screen.getByText('Gastroenterologist').selected).toBe(true);

        const experienceInput = screen.getByPlaceholderText('Experience');
        fireEvent.change(experienceInput, { target: { value: '5' } });
        expect(experienceInput.value).toBe('5');

        const stateInput = screen.getByPlaceholderText('State');
        const cityInput = screen.getByPlaceholderText('City');

        fireEvent.change(stateInput, { target: { value: 'telangana' } });

        expect(stateInput.value).toBe('telangana');

        fireEvent.change(cityInput, { target: { value: 'sricity' } });

        expect(cityInput.value).toBe('sricity');

        const pincodeInput = screen.getByPlaceholderText('Pincode');
        fireEvent.change(pincodeInput, { target: { value: '123456' } });
        expect(pincodeInput.value).toBe('123456');


        const mobileNumInput = screen.getByPlaceholderText('Mobile Number');
        fireEvent.change(mobileNumInput, { target: { value: '1234567890' } });
        expect(mobileNumInput.value).toBe('1234567890');

        const emailInput = screen.getByPlaceholderText('Email');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput.value).toBe('test@example.com');

        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        expect(passwordInput.value).toBe('password123');


        fireEvent.submit(screen.getByText('Submit'));
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1); 
        });

    });
});
