import React, { useState, useEffect } from "react";
import axios from "axios";
import PieChart from './ServicesPieChart.js';
import '../../css/Maleesha/DashBoardHome.css';

// Date and Time Component
const DateTimeDisplay = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="date-time-display">
      {currentDateTime.toLocaleString()}
    </div>
  );
};

// DashboardHome Component
export default function DashboardHome() {

    const [popularServices, setPopularServices] = useState([]);

  useEffect(() => {
    axios.get("/services/popular-services").then(response => {
        
        setPopularServices(response.data);
      })
      .catch(error => {
        console.error("Error fetching popular services:", error);
      });
  }, []);

  return (
    <div className="dashboard-home">
      <DateTimeDisplay />
      <div className="popularService">
        <p>POPULAR SERVICES</p>
        <table>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Bookings</th>
            </tr>
          </thead>
          <tbody>
            {popularServices.map(service => (
              <tr key={service._id}>
                <td>{service._id}</td>
                <td>{service.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="lineChart">
        <PieChart/>
      </div>
    </div>
  );
}
