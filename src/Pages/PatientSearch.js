import React, { useState } from "react";
import { Form, Button, Table, Container, Row, Col } from "react-bootstrap";
import './PatientSearch.css';

const PatientSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Here, you would typically make an API call to fetch patient data based on the search term
    // For this example, let's assume we have a dummy list of patients
    const dummyPatients = [
      { id: 1, name: 'John Doe', age: 35 },
      { id: 2, name: 'Jane Smith', age: 42 },
      { id: 3, name: 'Bob Johnson', age: 28 },
    ];
    setPatients(dummyPatients.filter((patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  return (
    <Container className="patient-search-container">
    <Row>
    {/* <Col md={4}></Col> */}
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
      <Table striped bordered hover className="patient-search-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Col>
      </Row>
    </Container>
  );
};

export default PatientSearch;
