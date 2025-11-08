import React from 'react';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import DashboardOverview from '../components/admin/DashboardOverview';
import TableManagement from '../components/admin/TableManagement';
import TableStatus from '../components/admin/TableStatus';
import MenuManagement from '../components/admin/MenuManagement';
import ReservationManagement from '../components/admin/ReservationManagement';
import PaymentMonitoring from '../components/admin/PaymentMonitoring';
import FeedbackManagement from '../components/admin/FeedbackManagement';
import AdminProfile from '../components/admin/AdminProfile';
import DataReports from '../components/admin/DataReports';

const Admin = () => {
  return (
    <Container fluid className="mt-4">
      <Row>
        <Col>
          <h1 className="mb-4">
            <i className="fas fa-cogs me-2"></i>
            Admin Dashboard
          </h1>
          
          <Tab.Container defaultActiveKey="dashboard">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="dashboard">
                      <i className="fas fa-tachometer-alt me-2"></i>
                      Dashboard
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="reservations">
                      <i className="fas fa-calendar-check me-2"></i>
                      Reservations
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="tables">
                      <i className="fas fa-table me-2"></i>
                      Tables
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="table-status">
                      <i className="fas fa-eye me-2"></i>
                      Table Status
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="menu">
                      <i className="fas fa-utensils me-2"></i>
                      Menu
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="payments">
                      <i className="fas fa-credit-card me-2"></i>
                      Payments
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="feedback">
                      <i className="fas fa-comments me-2"></i>
                      Feedback
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="reports">
                      <i className="fas fa-chart-bar me-2"></i>
                      Reports
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="profile">
                      <i className="fas fa-user-cog me-2"></i>
                      Profile
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="dashboard">
                    <DashboardOverview />
                  </Tab.Pane>
                  <Tab.Pane eventKey="reservations">
                    <ReservationManagement />
                  </Tab.Pane>
                  <Tab.Pane eventKey="tables">
                    <TableManagement />
                  </Tab.Pane>
                  <Tab.Pane eventKey="table-status">
                    <TableStatus />
                  </Tab.Pane>
                  <Tab.Pane eventKey="menu">
                    <MenuManagement />
                  </Tab.Pane>
                  <Tab.Pane eventKey="payments">
                    <PaymentMonitoring />
                  </Tab.Pane>
                  <Tab.Pane eventKey="feedback">
                    <FeedbackManagement />
                  </Tab.Pane>
                  <Tab.Pane eventKey="reports">
                    <DataReports />
                  </Tab.Pane>
                  <Tab.Pane eventKey="profile">
                    <AdminProfile />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;