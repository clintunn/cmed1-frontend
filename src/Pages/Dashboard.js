import React from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import Sidebar from "../Component/Sidebar";
import HealthCard from "../Component/HealthCard";


function Dashboard() {
  return (
    <div>
      <Container>
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col md={10}>
            <Row>
              <Col md={3}>
                <HealthCard title="Weight" data={75} unit="kg" />
              </Col>
              <Col md={3}>
                <HealthCard title="Blood Pressure" data="120/80" unit="mmHg" />
              </Col>
            </Row>
            {/* Add more HealthCard components or other sections */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
