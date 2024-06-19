import React from "react";
import { useEffect, useState } from "react";
import { Card, ListGroup, Table, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import './Patient.css';

function Patient() {
return (
<Container fluid>
    {/* <Row>
        <Col md={12} className="d-flex flex-direction-column align-items-center justify-content-center">
            <h2 className="head1"> Patient Profile</h2>
        </Col>
    </Row> */}
    <Row className="mb-4">
    {/* Patient Information Section */}
    <Col xs={12} md={6}>
        <Card className="patient-info-card">
        <Card.Header>Patient Information</Card.Header>
        <Card.Body>
            <Card.Title>
            {/* {patientData.name} */}
            </Card.Title>
            <ListGroup>
            <ListGroup.Item>
                {/* Age: {patientData.age} */}
            </ListGroup.Item>
            <ListGroup.Item>
                {/* Gender: {patientData.gender} */}
            </ListGroup.Item>
            <ListGroup.Item>
                {/* Contact: {patientData.contact} */}
            </ListGroup.Item>
            {/* Add more patient information fields as needed */}
            </ListGroup>
        </Card.Body>
        </Card>
    </Col>
    </Row>

    {/* Patient History Section */}
    <Row>
    <Col xs={12}>
        <h4>Patient History</h4>
        <Table striped bordered hover className="patient-history-table">
        <thead>
            <tr>
            <th>Date</th>
            <th>Diagnosis</th>
            <th>Treatment</th>
            </tr>
        </thead>
        <tbody>
            {/* {patientHistory.map((record, index) => (
            <tr key={index}>
                <td>{record.date}</td>
                <td>{record.diagnosis}</td>
                <td>{record.treatment}</td>
            </tr>
            ))} */}
        </tbody>
        </Table>
    </Col>
    </Row>
</Container>
);
}

export default Patient;
