import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./Consultation.css";

function Consultation() {
return (
<Container>
    <Row>
        <Col md={12} className="d-flex flex-direction-column align-items-center justify-content-center">
            <h2 className="head1"> New Consultation</h2>
        </Col>
    </Row>
    <Row>
        <Col>
        <Form className="con1">
        {/* add something here to make sure the user exists before proceeding with consultation */}
        <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Patient Matric Number or Health ID</Form.Label>
            <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Major Complaint</Form.Label>
            <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formName">
            <Form.Label>History of Present illness</Form.Label>
            <Form.Control as="textarea" rows={6} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Physical Examination</Form.Label>
            <Form.Control as="textarea" rows={6} />
        </Form.Group>
        <Form.Group controlId="formName">
            <Form.Label>Diagnosis</Form.Label>
            <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Form.Group controlId="formName">
            <Form.Label>Treatment</Form.Label>
            <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Button variant="dark" type="submit">
            Submit
        </Button>
        </Form>
        </Col>
    </Row>
</Container>
);
}

export default Consultation;
