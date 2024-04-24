import axios from "axios";
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from "react";
import '../CSS/Yasiru/attendancereport.css'

export default function Attendancecount() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    function getAttendance() {
      axios.get("/Attendancecount/")
        .then((res) => {
          // Group attendance date by employee empId
          const attendanceMap = new Map();
          res.data.forEach((employee) => {
            const { empId, jobRole, attendance } = employee;
            const key = `${empId}_${jobRole}`;
            if (attendanceMap.has(key)) {
              // If employee exists in the map, update attendance
              const existingAttendance = attendanceMap.get(key);
              // Only increment attendance if it's true (1)
              attendanceMap.set(key, {
                ...existingAttendance,
                attendance: existingAttendance.attendance + (attendance ? 1 : 0)
              });
            } else {
              // If employee is not in the map, add new entry
              attendanceMap.set(key, {
                empId,
                jobRole,
                attendance: attendance ? 1 : 0
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

    // Update current date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Fetch attendance data on component mount
    getAttendance();

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const deleteEmployee = (empId) => {
    axios.delete(`/Attendancecount/delete/${empId}`).then(res => {
      alert('Employee deleted');
      // Update the employee list after deletion if necessary
    }).catch(error => {
      alert(error.response.data.status);
    });
  };

  return (
    <Table striped bordered hover className="attendancereport">
      <>
        <thead>
          <tr>
            <th>empId</th>
            <th>jobRole</th>
            <th>attendance</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((employee) => (
            <tr key={`${employee.empId}_${employee.jobRole}`}>
              <td>{employee.empId}</td>
              <td>{employee.jobRole}</td>
              <td>{employee.attendance}</td>
              {/* <td>
                <button type="submit" className='text-decoration-none btn btn-sm btn btn-danger mx-1' onClick={() => deleteEmployee(employee.empId)}>Delete</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </>
    </Table>
  );
}
