import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';

function AppointmentManagement() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://192.168.162.196:5001/api/appointments/my-appointments');
      setAppointments(response.data);
    } catch (error) {
      setError('Error fetching appointments');
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await axios.put(`http://192.168.162.196:5001/api/appointments/${appointmentId}`, { status: newStatus });
      setSuccess('Appointment status updated successfully');
      fetchAppointments();
    } catch (error) {
      setError('Error updating appointment status');
    }
  };

  return (
    <div>
      <h2>Appointment Management</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Patient</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment._id}>
              <td>{new Date(appointment.date).toLocaleDateString()}</td>
              <td>{appointment.time}</td>
              <td>{appointment.patient.name}</td>
              <td>{appointment.reason}</td>
              <td>{appointment.status}</td>
              <td>
                {appointment.status === 'pending' && (
                  <>
                    <Button variant="success" onClick={() => handleStatusChange(appointment._id, 'confirmed')}>Confirm</Button>
                    <Button variant="danger" onClick={() => handleStatusChange(appointment._id, 'canceled')}>Cancel</Button>
                  </>
                )}
                {appointment.status === 'confirmed' && (
                  <Button variant="primary" onClick={() => handleStatusChange(appointment._id, 'completed')}>Mark as Completed</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AppointmentManagement;