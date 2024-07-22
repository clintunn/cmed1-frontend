import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

axios.defaults.withCredentials = true;

function HistoryPage() {
const [historyData, setHistoryData] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
const fetchHistoryData = async () => {
    try {
    const response = await axios.get('http://192.168.55.196:5001/api/consultations/history');
    setHistoryData(response.data);
    setIsLoading(false);
    } catch (err) {
    console.error("Error fetching history data:", err);
    setError("Failed to load history data. Please try again later.");
    setIsLoading(false);
    }
};

fetchHistoryData();
}, []);

if (isLoading) {
return (
    <Container className="text-center mt-5">
    <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner>
    </Container>
);
}

if (error) {
return (
    <Container className="mt-5">
    <Alert variant="danger">{error}</Alert>
    </Container>
);
}

return (
<Container fluid>
    <Row>
    <Col>
        <h2>Consultation History</h2>
    </Col>
    </Row>
    <Row>
    <Col>
        <Table striped bordered hover responsive>
        <thead>
            <tr>
            <th>Date</th>
            <th>Patient</th>
            <th>Diagnosis</th>
            <th>Treatment</th>
            </tr>
        </thead>
        <tbody>
            {historyData.map((item, index) => (
            <tr key={index}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.patientName}</td>
                <td>{item.diagnosis}</td>
                <td>{item.treatment}</td>
            </tr>
            ))}
        </tbody>
        </Table>
    </Col>
    </Row>
</Container>
);
}

export default HistoryPage;