import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';


function Navigation() {
return (
<Navbar expand="lg" bg="dark" data-bs-theme="dark">
    <Container>
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
            <NavDropdown.Item href="#action/3.4">
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