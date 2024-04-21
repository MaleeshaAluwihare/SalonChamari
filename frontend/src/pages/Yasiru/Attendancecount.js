import axios from "axios";
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from "react";
import { BarChart } from "../../components/Yasiru/bar";
import { PieChart } from "../../components/Yasiru/Pie";
import { LineChartData } from "../../components/Yasiru/Data";
import { LineGraph } from "../../components/Yasiru/Line";


export default function Attendancecount() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    function getAttendance() {
      axios.get("/Attendancecount/")
        .then((res) => {
          // Group attendance date by employee empId
          const attendanceMap = new Map();
          res.data.forEach((employee) => {
            const { empId, jobRole, attendance, date } = employee;
            const key = `${empId}_${jobRole}`;
            if (attendanceMap.has(key)) {
              // If employee exists in the map, update attendance
              const existingAttendance = attendanceMap.get(key);
              attendanceMap.set(key, {
                ...existingAttendance,
                attendance: existingAttendance.attendance + attendance
              });
            } else {
              // If employee is not in the map, add new entry
              attendanceMap.set(key, {
                empId,
                jobRole,
                attendance,
                date,
              
              });
            }
          });
          // Convert map values to an array for rendering
          const formattedAttendance = Array.from(attendanceMap.values());
          setAttendanceData(formattedAttendance);
        })
        .catch((err) => {
          console.error("Error fetching attendance data:", err);
          // Display an error message to the user or handle the error appropriately
        });
    }
    getAttendance();
  }, []);

  return (
    <Table striped bordered hover>
      <>
      <thead>
        <tr>
          <th>empId</th>
          <th>jobRole</th>
          <th>attendance</th>
          <th>date</th> 
        </tr>
      </thead>
      <tbody>
        {attendanceData.map((employee) => (
          <tr key={`${employee.empId}_${employee.jobRole}`}>
            <td>{employee.empId}</td>
            <td>{employee.jobRole}</td>
            <td>{employee.attendance}</td>
            <td>{employee.date}</td> {/* Display the current date */}
          </tr>
        ))}
      </tbody>
        
      </>
    </Table>
    
  );
}
