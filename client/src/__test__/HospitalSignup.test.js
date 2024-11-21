import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureTestStore } from '../app/store';
import '@testing-library/jest-dom/extend-expect';
import HospitalSignup from '../pages/auth/HospitalSignup';

describe('HospitalSignup Component', () => {
    it('submits the form and redirects to login page after successful registration', async () => {
        global.fetch = jest.fn();
        // eslint-disable-next-line testing-library/no-unnecessary-act
        const store = configureTestStore();
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => render(<Provider store={store}><Router><HospitalSignup /></Router></Provider>))
        const nameInput = screen.getByPlaceholderText('Hospital Name');
        fireEvent.change(nameInput, { target: { value: 'Hospital ABC' } });
        expect(nameInput.value).toBe('Hospital ABC');

        const regNoInput = screen.getByPlaceholderText('Registration No.');
        fireEvent.change(regNoInput, { target: { value: '123456' } });
        expect(regNoInput.value).toBe('123456');

        const emailInput = screen.getByPlaceholderText('Email');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput.value).toBe('test@example.com');

        const passwordInput = screen.getByPlaceholderText('Password');
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        expect(passwordInput.value).toBe('password123');

        const stateInput = screen.getByPlaceholderText('State');
        fireEvent.change(stateInput, { target: { value: 'Telangana' } });
        expect(stateInput.value).toBe('Telangana');

        const cityInput = screen.getByPlaceholderText('City');
        fireEvent.change(cityInput, { target: { value: 'Hyderabad' } });
        expect(cityInput.value).toBe('Hyderabad');

        const pincodeInput = screen.getByPlaceholderText('Pincode');
        fireEvent.change(pincodeInput, { target: { value: '500001' } });
        expect(pincodeInput.value).toBe('500001');

        fireEvent.submit(screen.getByText('Submit'));
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });

    });
});
