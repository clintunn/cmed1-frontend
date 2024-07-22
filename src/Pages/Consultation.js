import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from "react-bootstrap/Alert";
import axios from 'axios';
import "./Consultation.css";

// Set axios defaults
axios.defaults.withCredentials = true;

function Consultation() {
    const [patientName, setPatientName] = useState('');
    const [patient, setPatient] = useState(null);
    const [searchError, setSearchError] = useState('');
    const [formData, setFormData] = useState({
        patientId: '',
        majorComplaints: '',
        historyOfPresentIllness: '',
        physicalExamination: '',
        diagnosis: '',
        treatment: '',
        medicationPrescriptions: [{ medication: '' }]
    });

    const handlePatientNameChange = (e) => {
        setPatientName(e.target.value);
        setSearchError('');
    };

    const searchPatient = async () => {
        try {
            const response = await axios.get(`http://192.168.55.196:5001/api/patients/search?name=${patientName}`);
            if (response.data && response.data.length > 0) {
                setPatient(response.data[0]);
                setFormData({ ...formData, patientId: response.data[0]._id });
                setSearchError('');
            } else {
                setPatient(null);
                setSearchError('Patient not found. Please check the name and try again.');
            }
        } catch (error) {
            console.error('Error searching for patient:', error);
            setPatient(null);
            setSearchError('Error searching for patient. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMedicationChange = (index, value) => {
        const updatedPrescriptions = [...formData.medicationPrescriptions];
        updatedPrescriptions[index].medication = value;
        setFormData({ ...formData, medicationPrescriptions: updatedPrescriptions });
    };

    const addMedication = () => {
        setFormData({
            ...formData,
            medicationPrescriptions: [...formData.medicationPrescriptions, { medication: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://192.168.55.196:5001/api/consultations', formData);
            console.log('Consultation created:', response.data);
            alert('Consultation created successfully');
            // Reset form or redirect here
            
        } catch (error) {
            console.error('Error creating consultation:', error.response ? error.response.data : error.message);
            alert('Error creating consultation: ' + (error.response ? error.response.data.error : error.message));
        }
    };

return (
<Container>
    <Row>
    <Col md={12} className="d-flex flex-direction-column align-items-center justify-content-center">
        <h2 className="head1">New Consultation</h2>
    </Col>
    </Row>
    <Row>
    <Col>
        {!patient ? (
        <Form className="con1">
            <Form.Group className="mb-3" controlId="formPatientName">
            <Form.Label>Patient Name</Form.Label>
            <Form.Control
                type="text"
                value={patientName}
                onChange={handlePatientNameChange}
                placeholder="Enter exact patient name"
                required
            />
            </Form.Group>
            <Button variant="dark" onClick={searchPatient}>
            Search Patient
            </Button>
            {searchError && <Alert variant="danger" className="mt-3">{searchError}</Alert>}
        </Form>
        ) : (
        <Form className="con1" onSubmit={handleSubmit}>
            <Alert variant="success">Patient found: {patient.name}</Alert>
            <Form.Group className="mb-3" controlId="formMajorComplaints">
            <Form.Label>Major Complaint</Form.Label>
            <Form.Control
                type="text"
                name="majorComplaints"
                value={formData.majorComplaints}
                onChange={handleChange}
                required
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHistoryOfPresentIllness">
            <Form.Label>History of Present Illness</Form.Label>
            <Form.Control
                as="textarea"
                rows={6}
                name="historyOfPresentIllness"
                value={formData.historyOfPresentIllness}
                onChange={handleChange}
                required
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhysicalExamination">
            <Form.Label>Physical Examination</Form.Label>
            <Form.Control
                as="textarea"
                rows={6}
                name="physicalExamination"
                value={formData.physicalExamination}
                onChange={handleChange}
                required
            />
            </Form.Group>
            <Form.Group controlId="formDiagnosis">
            <Form.Label>Diagnosis</Form.Label>
            <Form.Control
                type="text"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                required
            />
            </Form.Group>
            <Form.Group controlId="formTreatment">
            <Form.Label>Treatment</Form.Label>
            <Form.Control
                type="text"
                name="treatment"
                value={formData.treatment}
                onChange={handleChange}
                required
            />
            </Form.Group>
            <Form.Group controlId="formMedications">
            <Form.Label>Medications</Form.Label>
            {formData.medicationPrescriptions.map((prescription, index) => (
                <Form.Control
                key={index}
                type="text"
                value={prescription.medication}
                onChange={(e) => handleMedicationChange(index, e.target.value)}
                placeholder="Enter medication"
                className="mb-2"
                required
                />
            ))}
            <Button variant="secondary" onClick={addMedication} className="mt-2">
                Add Medication
            </Button>
            </Form.Group>
            <Button variant="dark" type="submit" className="mt-3">
            Submit
            </Button>
        </Form>
        )}
    </Col>
    </Row>
</Container>
);
}


export default Consultation;