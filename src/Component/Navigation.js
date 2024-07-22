import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';

function Navigation() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5001/api/providers/logout', {}, { withCredentials: true });
            // Clear any user data from local storage or state management
            localStorage.removeItem('user');
            // Redirect to login page or home page
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // Handle error (show a message to the user)
        }
    };
return (
<Navbar expand="lg" bg="dark" data-bs-theme="dark">
    <Container fluid>
    <LinkContainer to='/'>
    <Navbar.Brand>Campus-Med</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
        <LinkContainer to='/'>
        <Nav.Link>Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/dashboard'>
        <Nav.Link>Dashboard</Nav.Link>
        </LinkContainer>
        {/* <Nav.Link>AI Chat</Nav.Link> */}
        <NavDropdown title="More" id="basic-nav-dropdown">
            <LinkContainer to='/AIchat'>
            <NavDropdown.Item>AI Chat</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to= '/History-page'>
            <NavDropdown.Item href="#action/3.1">History</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/patient-search'>
            <NavDropdown.Item>
            Patient search
            </NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/consultation-new'>
            <NavDropdown.Item href="#action/3.3">Consultation - new</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/consultation-follow-up'>
            <NavDropdown.Item href="#action/3.3">Consultation - follow up</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>
                Log out
            </NavDropdown.Item>
        </NavDropdown>
        </Nav>
    </Navbar.Collapse>
    </Container>
</Navbar>
);
}

export default Navigation;