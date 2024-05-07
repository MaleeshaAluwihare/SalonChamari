import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from '../../css/Yasiru/AttendacepageStyle.module.css';

export default function Attendancepage() {
  const [empId, setEmpId] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [attendance, setAttendance] = useState("");
  const [date, setDate] = useState(""); // State to hold the date value
  const [employeeID, setEmployeeID] = useState([]);

  useEffect(() => {
    const fetchEmployeeID = async () => {
      try {
        const response = await axios.get('/SalonEmp/');
        setEmployeeID(response.data.map(employee => employee.Employee_ID));
      } catch (error) {
        console.error("Error fetching data")
      }
    };
    fetchEmployeeID();
  }, []);

  function sendData(e) {
    e.preventDefault();

    const EmployeeAttendance = {
      empId,
      jobRole,
      attendance,
      date
    }

    axios.post("/Attendancecount/add", EmployeeAttendance)
      .then(() => {
        alert("Employee added")
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <div className={styles.Attendancsubmit}>
      <h3>Enter Attendance Details</h3>
      <form onSubmit={sendData} className={styles.Attendacepage}>
        <div className={styles.mb3}>
          <label htmlFor="name">empId</label>
          <select className={styles.formControl} required id="empId" value={empId} onChange={(e) => setEmpId(e.target.value)}>
            <option value="">Select Employee</option>
            {employeeID.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
        <div className={styles.mb3}>
          <label htmlFor="job">jobRole</label>
          <input type="text" className={styles.formControl} id="job" required placeholder="Enter job role" onChange={(e) => setJobRole(e.target.value)} />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="attendance">Attendance</label>
          <input type="number" className={styles.formControl} id="attendance" required placeholder="Enter 1 or 0"  onChange={(e) => setAttendance(e.target.value)} />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="date">Date</label>
          <input type="date" className={styles.formControl} id="date" required value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <button type="submit" className={styles.Attendancesubmit}>Submit</button>
      </form>
    </div>
  )
}