import React, { useState, useEffect } from "react";
import { Card, Table, Badge, Row, Col, Form, Button } from "react-bootstrap";
import { adminAPI } from "../../services/api";
import { formatTo12Hour } from "../../utils/timeUtils";

const TableStatus = () => {
  const [tableStatus, setTableStatus] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    loadTableStatus();
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    const interval = setInterval(loadTableStatus, 30000);
    return () => clearInterval(interval);
  }, [selectedDate, selectedTime]);

  const loadTableStatus = async () => {
    try {
      const params =
        selectedDate && selectedTime
          ? `?date=${selectedDate}&time=${selectedTime}`
          : "";
      const response = await adminAPI.getTableStatus(params);
      setTableStatus(response.data || []);
    } catch (error) {
      console.error("Error loading table status:", error);
      setTableStatus([]);
    }
  };

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">
          <i className="fas fa-eye me-2"></i>
          Real-time Table Status
        </h5>
      </Card.Header>
      <Card.Body>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Check Date</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Check Time Slot</Form.Label>
              <Form.Select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Select Time Slot</option>
                <option value="00:00">12:00 AM</option>
                <option value="01:00">1:00 AM</option>
                <option value="02:00">2:00 AM</option>
                <option value="03:00">3:00 AM</option>
                <option value="04:00">4:00 AM</option>
                <option value="05:00">5:00 AM</option>
                <option value="06:00">6:00 AM</option>
                <option value="07:00">7:00 AM</option>
                <option value="08:00">8:00 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="21:00">9:00 PM</option>
                <option value="22:00">10:00 PM</option>
                <option value="23:00">11:00 PM</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4} className="d-flex align-items-end">
            <Button onClick={loadTableStatus}>
              <i className="fas fa-refresh me-2"></i>
              Refresh Status
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Table #</th>
              <th>Capacity</th>
              <th>Location</th>
              <th>Status</th>
              <th>Customer</th>
              <th>Time Slot</th>
            </tr>
          </thead>
          <tbody>
            {tableStatus.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-3">
                  No table data available
                </td>
              </tr>
            ) : (
              tableStatus.map((table) => (
                <tr key={table.id}>
                  <td>{table.table_number}</td>
                  <td>{table.capacity} people</td>
                  <td>{table.location}</td>
                  <td>
                    <Badge
                      bg={table.status === "reserved" ? "warning" : "success"}
                    >
                      {table.status === "reserved" ? "Reserved" : "Available"}
                    </Badge>
                    {table.booking_status && (
                      <>
                        <br />
                        <small className="text-muted">
                          ({table.booking_status})
                        </small>
                      </>
                    )}
                  </td>
                  <td>{table.customer_name || "-"}</td>
                  <td>
                    {table.booking_time && table.end_time ? (
                      <>
                        {formatTo12Hour(table.booking_time)} -{" "}
                        {formatTo12Hour(table.end_time)}
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default TableStatus;
