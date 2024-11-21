import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const PrescriptionModal = ({ onHide, appointment }) => {
    const [prescriptionData, setPrescriptionData] = useState({
        bloodPressure: '',
        temperature: '',
        height: '',
        weight: '',
        oxygen: '',
        medicalTests: '',
        surgery: 'no',
        medicines: '',
        note: '',
        patientId: '<%=patientId%>',
        hospitalId: '<%=hospitalId%>',
        appointmentId: '<%=appointmentId%>',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPrescriptionData({ ...prescriptionData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to submit the form data
        // You can use prescriptionData for the form data
        onHide(); // Close the modal after submitting
    };

    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Medical Prescription</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* Add your form fields here */}
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Blood Pressure"
                            name="bloodPressure"
                            value={prescriptionData.bloodPressure}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    {/* Add other form fields as needed */}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PrescriptionModal;
