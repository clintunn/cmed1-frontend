import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Alert, Spinner, Nav, Navbar } from 'react-bootstrap';
import { FaUser, FaStethoscope, FaBell, FaCalendarCheck, FaBars } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import './Dashboard.css';

axios.defaults.withCredentials = true;

function useDashboardData() {
  const [data, setData] = useState({
    profile: {},
    lastConsultation: {},
    notifications: [],
    pendingAppointments: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [profileRes, consultationRes, notificationsRes, appointmentsRes] = await Promise.all([
        axios.get('http://192.168.55.196:5001/api/providers/providers/myself'),
        axios.get('http://192.168.55.196:5001/api/consultations/last'),
        axios.get('http://192.168.55.196:5001/api/notifications'),
        axios.get('http://192.168.55.196:5001/api/appointments/pending')
      ]);
  
      setData({
        profile: profileRes.data,
        lastConsultation: consultationRes.data,
        notifications: notificationsRes.data,
        pendingAppointments: appointmentsRes.data
      });
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error('Error fetching data:', err.response ? err.response.data : err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refreshData: fetchData };
}

function Dashboard() {
  const { data, isLoading, error, refreshData } = useDashboardData();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleConfirmAppointment = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:5001/api/appointments/${appointmentId}`, { status: 'confirmed' });
      refreshData();
    } catch (err) {
      console.error('Error confirming appointment:', err);
      alert('Failed to confirm appointment. Please try again.');
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await axios.patch(`http://localhost:5001/api/notifications/${notificationId}/read`);
      refreshData();
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  if (isLoading) return (
    <div className="loading-spinner">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );

  return (
    <div className="dashboard-container">
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

      <Container fluid>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="dark" onClick={refreshData} className="mb-3">Refresh Data</Button>
        <Row>
          <Col lg={3} className="sidebar-col">
            <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
              <Button variant="link" className="sidebar-toggle d-lg-none" onClick={toggleSidebar}>
                <FaBars />
              </Button>
              <nav className="sidebar-nav">
                <ul>
                  <li><a href="#profile" onClick={toggleSidebar}><FaUser /> Profile</a></li>
                  <li><a href="#last-consultation" onClick={toggleSidebar}><FaStethoscope /> Last Consultation</a></li>
                  <li><a href="#notifications" onClick={toggleSidebar}><FaBell /> Notifications</a></li>
                  <li><a href="#pending-appointments" onClick={toggleSidebar}><FaCalendarCheck /> Pending Appointments</a></li>
                </ul>
              </nav>
            </div>
          </Col>
          <Col lg={9} className="main-content">
            <h2 className="welcome-title">Welcome to CampusMed, Dr. {data.profile.name}</h2>
            <Row>
              <Col md={12} lg={4}>
                <Card className="dashboard-card profile-card">
                  <Card.Body>
                    <Card.Title><FaUser /> User Profile</Card.Title>
                    <Card.Text className="profile-info">
                      <p><strong>Name:</strong> {data.profile.name}</p>
                      <p><strong>Gender:</strong> {data.profile.gender}</p>
                      <p><strong>Specialty:</strong> {data.profile.specialization}</p>
                      <p><strong>Credentials:</strong> {data.profile.credentials}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={12} lg={8}>
                <Card className="dashboard-card consultation-card">
                  <Card.Body>
                    <Card.Title><FaStethoscope /> Last Consultation Treated</Card.Title>
                    <Card.Text className="consultation-details">
                      <p><strong>Patient:</strong> {data.lastConsultation.patientName}</p>
                      <p><strong>Date:</strong> {new Date(data.lastConsultation.date).toLocaleDateString()}</p>
                      <p><strong>Diagnosis:</strong> {data.lastConsultation.diagnosis}</p>
                      <p><strong>Treatment:</strong> {data.lastConsultation.treatment}</p>
                      <p><strong>Medication:</strong> {data.lastConsultation.medication}</p>
                      <p><strong>Instructions:</strong> {data.lastConsultation.instructions}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={12} lg={6}>
                <Card className="dashboard-card notifications-card">
                  <Card.Body>
                    <Card.Title><FaBell /> Notifications</Card.Title>
                    {data.notifications.map(notification => (
                      <Alert 
                        key={notification._id} 
                        variant={notification.isRead ? "secondary" : "info"} 
                        className="notification-alert"
                        onClick={() => markNotificationAsRead(notification._id)}
                      >
                        {notification.message}
                      </Alert>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={12} lg={6}>
                <Card className="dashboard-card appointments-card">
                  <Card.Body>
                    <Card.Title><FaCalendarCheck /> Pending Appointments</Card.Title>
                    {data.pendingAppointments.map(appointment => (
                      <div key={appointment._id} className="appointment-item">
                        <span>
                          <strong>{appointment.patient.name}</strong> - {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        </span>
                        <Button 
                          variant="primary" 
                          size="sm" 
                          onClick={() => handleConfirmAppointment(appointment._id)}
                        >
                          Confirm
                        </Button>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
