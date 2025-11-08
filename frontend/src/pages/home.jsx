import React, { useState } from 'react';
import { Container, Tab, Nav } from 'react-bootstrap';
import { useAuth } from '../context/auth-context';
import UserDashboard from '../components/user/UserDashboard';
import AvailableTables from '../components/user/AvailableTables';
import TableReservation from '../components/user/TableReservation';
import MenuDisplay from '../components/MenuDisplay';
import FeedbackForm from '../components/FeedbackForm';
import UserProfile from '../components/user/UserProfile';

const Home = () => {
  const { user } = useAuth();
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleTableSelect = (table, date, time) => {
    setSelectedTable(table);
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleReservationComplete = () => {
    setSelectedTable(null);
    setSelectedDate('');
    setSelectedTime('');
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">
        <i className="fas fa-coffee me-2"></i>
        User Dashboard
      </h1>
      
      <Tab.Container defaultActiveKey="dashboard">
        <Nav variant="tabs" className="justify-content-center mb-4">
          <Nav.Item>
            <Nav.Link eventKey="dashboard">
              <i className="fas fa-tachometer-alt me-2"></i>
              Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tables">
              <i className="fas fa-table me-2"></i>
              Available Tables
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="reservation">
              <i className="fas fa-calendar-plus me-2"></i>
              Reservation
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="menu">
              <i className="fas fa-utensils me-2"></i>
              Menu
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="feedback">
              <i className="fas fa-comment me-2"></i>
              Feedback
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="profile">
              <i className="fas fa-user me-2"></i>
              Profile
            </Nav.Link>
          </Nav.Item>
        </Nav>
        
        <Tab.Content>
          <Tab.Pane eventKey="dashboard">
            <UserDashboard />
          </Tab.Pane>
          
          <Tab.Pane eventKey="tables">
            <AvailableTables onTableSelect={handleTableSelect} />
          </Tab.Pane>
          
          <Tab.Pane eventKey="reservation">
            <TableReservation 
              selectedTable={selectedTable}
              selectedDate={selectedDate}
              startTime={selectedTime}
              onReservationComplete={handleReservationComplete}
            />
          </Tab.Pane>
          
          <Tab.Pane eventKey="menu">
            <MenuDisplay />
          </Tab.Pane>
          
          <Tab.Pane eventKey="feedback">
            <FeedbackForm />
          </Tab.Pane>
          
          <Tab.Pane eventKey="profile">
            <UserProfile />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default Home;