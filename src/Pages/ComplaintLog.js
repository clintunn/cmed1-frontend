import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Navbar, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from "react-bootstrap/Alert";
import axios from 'axios';
import './ComplaintLog.css';


function ProviderComplaintLog() {
    const [complaints, setComplaints] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/complaints');
                setComplaints(response.data);
            } catch (err) {
                setError('Failed to fetch complaints');
            }
        };

        fetchComplaints();
    }, []);

    const markAsTreated = async (id) => {
        try {
            await axios.put(`http://localhost:5001/api/complaints/${id}/treat`);
            setComplaints(complaints.map(complaint => 
                complaint._id === id ? { ...complaint, status: 'Treated' } : complaint
            ));
        } catch (err) {
            setError('Failed to update complaint status');
        }
    };

    return (
        <div className="provider-complaint-log">
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
                    <LinkContainer to='/complaint-log'>
                        <Nav.Link>Complaint Log</Nav.Link>
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
            <Container>
            <h2 className="mb-4 text-center">Patient Complaints</h2>
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            
            <Table striped bordered hover responsive="sm">
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Major Complaint</th>
                        <th>History of Present Illness</th>
                        <th>Physical Examination</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map(complaint => (
                            <tr key={complaint._id}>
                            <td>{complaint.patientName}</td>
                            <td>{complaint.majorComplaints}</td>
                            <td>{complaint.historyOfPresentIllness}</td>
                            <td>{complaint.physicalExamination}</td>
                            <td>{complaint.status}</td>
                            <td>
                                {complaint.status === 'Pending' && (
                                    <Button 
                                        variant="success" 
                                        className="me-2"
                                        onClick={() => markAsTreated(complaint._id)}
                                    >
                                        Mark as Treated
                                    </Button>
                                )}
                                <Link to="/consultation-new" state={{ complaint: complaint }}>
                                    <Button variant="primary">
                                        Create Consultation
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
        </div>
    );
}

export default ProviderComplaintLog;
