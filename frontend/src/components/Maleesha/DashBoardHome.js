import React, { useState, useEffect } from "react";
import axios from "axios";
import PieChart from "./PieChart";
import '../../css/Maleesha/DashBoardHome.css';

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
      <div className="pie-chart-container">
        <p>Services Distribution</p>
        <PieChart/>
      </div>
    </div>
  );
}
