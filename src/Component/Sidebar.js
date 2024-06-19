import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


function Sidebar() {
  return (
    <Nav className="flex-column" defaultActiveKey={"/home"}>
        <LinkContainer to='/'><Nav.Link>Home</Nav.Link></LinkContainer>
        <LinkContainer to='/'><Nav.Link>Home</Nav.Link></LinkContainer>
        <LinkContainer to='/'><Nav.Link>Home</Nav.Link></LinkContainer>
        <LinkContainer to='/'><Nav.Link>Home</Nav.Link></LinkContainer>
        <LinkContainer to='/'><Nav.Link>Home</Nav.Link></LinkContainer>
    </Nav>
  );
}

export default Sidebar;
