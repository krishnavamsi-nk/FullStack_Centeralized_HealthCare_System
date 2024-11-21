import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../components/Footer/Footer';

describe('Footer Component', () => {
    it('renders without crashing', () => {
        render(<Footer />);
    });

    it('displays links to Home, Features, FAQs, and About', () => {
        render(<Footer />);
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Features')).toBeInTheDocument();
        expect(screen.getByText('FAQs')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('displays the correct copyright text', () => {
        render(<Footer />);
        expect(screen.getByText('© 2022 CHS, Inc')).toBeInTheDocument();
    });
});
