import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";

function Home() {
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          {/* <Jumbotron className="text-center"> */}
            <h1>Welcome to Health Management System</h1>
            <p>Take control of your health with our comprehensive platform.</p>
            <Button variant="primary">Get Started</Button>
          {/* </Jumbotron> */}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={4}>
          <h2>Features</h2>
          <ul>
            <li>Track your weight and body measurements</li>
            <li>Log your daily activities and exercise routines</li>
            <li>Create personalized diet plans</li>
            <li>Schedule and manage appointments with healthcare providers</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
