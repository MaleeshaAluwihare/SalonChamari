import axios from "axios";
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from "react";

export default function Attendancecount() {
  const [Attendance, setattendance] = useState([]);

  useEffect(() => {
    function getAttendance() {
      axios.get("/Attendancecount/").then((res) => {
        const formattedAttendance = res.data.map((employee) => {
          return {
            ...employee,
            data: new Date().toLocaleDateString() // Set the current date
          };
        });
        setattendance(formattedAttendance);
      }).catch((err) => {
        alert(err.message);
      });
    }
    getAttendance();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>empId</th>
          <th>jobRole</th>
          <th>attendance</th>
          <th>data</th> 
        </tr>
      </thead>
      <tbody>
        {Attendance.map((Employee) => (
          <tr key={Employee.empId}>
            <td>{Employee.empId}</td>
            <td>{Employee.jobRole}</td>
            <td>{Employee.attendance}</td>
            <td>{Employee.data}</td> {/* Display the current date */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
