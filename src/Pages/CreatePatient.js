import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

axios.defaults.withCredentials = true;

const CreatePatientPage = () => {
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    healthId: '',
    gender: '',
    email: '',
    password: '',
    role: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('http://192.168.55.196:5001/api/patients/', patientData);
      setSuccess(true);
      setPatientData({
        name: '',
        age: '',
        healthId: '',
        gender: '',
        email: '',
        password: '',
        role: '',
      });
    } catch (error) {
        console.error('Full error object:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
      setError(`Error creating patient: ${error.response.data.message || 'Please try again.'}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
      setError('No response received from server. Please try again.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
      setError('Error creating patient. Please try again.');
    }
  }
};

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={8}>
          <Card>
            <Card.Header as="h4">Create New Patient</Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">Patient created successfully!</Alert>}
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={patientData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        name="age"
                        value={patientData.age}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Health ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="clinicId"
                        value={patientData.clinicId}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        name="gender"
                        value={patientData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Card.Header as="h4">Account Creation</Card.Header>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={patientData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={patientData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={patientData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="patient">Patient</option>
                    <option value="provider">Health Provider</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="dark" type="submit">
                  Create Patient
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePatientPage;