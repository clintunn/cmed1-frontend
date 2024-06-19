import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import axios from "axios";

function HistoryPage() {
return (
<Container fluid>
    <Row>
    <Col>
        <h2>History</h2>
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
            {/* <th>Status</th> */}
            </tr>
        </thead>
        <tbody>
            {/* {historyData.map((item, index) => (
            <tr key={index}>
                <td>{item.date}</td>
                <td>{item.description}</td>
                <td>{item.status}</td>
            </tr>
            ))} */}
        </tbody>
        </Table>
    </Col>
    </Row>
</Container>
);
}

export default HistoryPage;
