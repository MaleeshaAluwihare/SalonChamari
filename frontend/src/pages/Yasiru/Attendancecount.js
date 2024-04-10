import axios from "axios";
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from "react";

export default function Attendancecount() {
  const [Attendance, setattendance] = useState([]);

  useEffect(() => {
    function getAttendance() {
      axios.get("/Attendancecount/").then((res) => {
        console.log(res.data)
        setattendance(res.data);
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
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {Attendance.map((Employee) => (
          <tr key={Employee.empId}>
            <td>{Employee.empId}</td>
            <td>{Employee.jobRole}</td>
            <td>{Employee.attendance}</td>
            <td>{Employee.Date}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
