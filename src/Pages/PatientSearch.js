import React, { useState } from "react";
import { Form, Button, Table, Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from 'axios'; 
import './PatientSearch.css';

const PatientSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.get(`http://localhost:5001/api/patients/search?name=${searchTerm}`);
      setPatients(response.data);
    } catch (error) {
      console.error('Error searching for patients:', error);
      setError('An error occurred while searching for patients');
    }
  };

  return (
    <div className="patientSearch-container">
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
        <Navbar.Brand href="#home">CampusMed</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/dashboard'>
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/create-patient'>
              <Nav.Link>Create Patient</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/AIchat'>
              <Nav.Link>AI Chat</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/History-page'>
              <Nav.Link>History</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/patient-search'>
              <Nav.Link>Patient search</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/consultation-new'>
              <Nav.Link>Consultation - new</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/consultation-follow-up'>
              <Nav.Link>Consultation - follow up</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    <Container className="patient-search-container">
      <Row>
        <Col>
          <Form onSubmit={handleSearch} className="patient-search-form">
            <Form.Group controlId="searchTerm">
              <Form.Label>Search for a patient</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Button variant="dark" type="submit" className="patient-search-button">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          {error && <p className="text-danger">{error}</p>}
          <Table striped bordered hover className="patient-search-table">
            <thead>
              <tr>
                {/* <th>Clinic ID</th> */}
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
            {patients.map((patient) => (
              <tr key={patient.clinicId}>
                {/* <td>{patient.clinicId}</td> */}
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
              </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default PatientSearch;