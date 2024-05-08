import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../../css/Yasiru/EmployeeprofileStyle.module.css';

export default function EmployeeProfile() {
  const navigate = useNavigate();
  const [empid, setEmpId] = useState("");
  const [empDetails, setEmpDetails] = useState({
    Employee_ID: '',
    Name: '',
    Address: '',
    jobRole: '',
    Salary: '',
    // Image:''
  });

  useEffect(() => {
    setEmpId(localStorage.getItem('empId'));
    if (empid) {
      axios.get(`http://localhost:8070/SalonEmp/get/${empid}`)
        .then(res => {
          console.log("Fetched employee details:", res.data);
          setEmpDetails(res.data.Employee);
        })
        .catch(error => console.error("Error fetching employee details:", error));
    }
  }, [empid]);

  const handleLogout = () => {
    localStorage.removeItem('empId');
    navigate('/EmpLogin'); // Redirect to /target_page
  };

  return (
    <div>
      <h3>Profile</h3>
      <form className={styles.profileEmp}>
        <div>
          <label htmlFor="employeeID">Employee ID:</label>
          <input
            type="text"
            id="employeeID"
            placeholder="Enter Employee ID"
            value={empDetails.Employee_ID || ''}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="employeeName">Employee Name:</label>
          <input
            type="text"
            id="employeeName"
            placeholder="Enter Employee Name"
            value={empDetails.Name || ''}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            placeholder="Address"
            value={empDetails.Address || ''}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="jobRole">Job Role:</label>
          <input
            type="text"
            id="jobRole"
            placeholder="Job Role"
            value={empDetails.jobRole || ''}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="dailySalary">Daily Salary:</label>
          <input
            type="text"
            id="dailySalary"
            placeholder="Daily Salary"
            value={empDetails.Salary || ''}
            readOnly
          />
        </div>
        {/* <div>
          <label htmlFor="Image">Image:</label>
          <input
            type="text"
            id="Image"
            placeholder="Image"
            value={empDetails.Image || ''}
            readOnly
          />
        </div> */}
        <button type="submit" className={styles.button}>Save</button>
        <button
          className={styles.Attendancegiven}
          onClick={() => navigate('/Attendacegive')}
        >
          Daily attendance
        </button>
        <button
          className={styles.LeaveRequest}
          onClick={() => navigate(`/Leavegive`)}
        >
          Leave
        </button>
        <button onClick={handleLogout}>Logout</button>
      </form>
    </div>
  );
}