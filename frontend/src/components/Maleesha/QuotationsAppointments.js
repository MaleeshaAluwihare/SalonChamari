import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Maleesha/QuoteAppointmentPage.css';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/quotation/fetch");
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.appointmentDate);
    const today = new Date();
    switch(filter) {
      case 'Today':
        return appointmentDate.toDateString() === today.toDateString();
      case 'This Week':
        const startOfWeek = today.getDate() - today.getDay();
        const endOfWeek = startOfWeek + 6;
        return appointmentDate.getDate() >= startOfWeek && appointmentDate.getDate() <= endOfWeek;
      case 'This Month':
        return appointmentDate.getMonth() === today.getMonth();
      default:
        return true;
    }
  });

  return (
    <div className="appointment-container">
      <h1>APPOINTMENTS</h1>
      <table className="fade-in">
        <thead>
          <tr>
                <th>Appointment ID</th>
                <th>Customer Name</th>
                <th>Contact Number</th>
                <th>Quotation</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
                <th>
                    <div className="filter-container">
                        <label htmlFor="filter">Filter:</label>
                        <select id="filter" onChange={e => setFilter(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Today">Today</option>
                        <option value="This Week">This Week</option>
                        <option value="This Month">This Month</option>
                        </select>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.appointmentID}</td>
                <td>{appointment.customerName}</td>
                <td>{appointment.contactNumber}</td>
                <td><a href={require(`../../QuotationPDF/${appointment.quotation}`)} target="_blank" rel="noopener noreferrer">
                  View Quote
                </a></td>
                <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                <td>{appointment.appointmentTime}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6"><b>NO APPOINTMENTS AVAILABLE..</b></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
