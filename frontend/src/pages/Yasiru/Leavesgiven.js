import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../css/Yasiru/LeavegiveStyle.module.css";

export default function Leave() {
  const [Employee_ID, setEmployee_ID] = useState("");
  const [date, setdate] = useState("");
  const [type, settype] = useState("");
  const [email, setemail] = useState("");
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
    const Leave = { Employee_ID, date, type, email }
    axios.post("/Leave/add", Leave)
      .then(() => {
        alert("Message added")
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <div className={styles.Attendancsubmit}>
      <h3>Enter Leave Details</h3>
      <form onSubmit={sendData} className={styles.Attendacepage}>
        <div className="mb-3">
          <label htmlFor="name">Employee_ID</label>
          <select
            className="form-control"
            required
            id="empId"
            value={Employee_ID}
            onChange={(e) => setEmployee_ID(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employeeID.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
          <div className="mb-3">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              required
              value={date}
              onChange={(e) => setdate(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="type">Type</label>
          <select
            className="form-control"
            id="type"
            required
            value={type}
            onChange={(e) => settype(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="fullday">Full day</option>
            <option value="halfday">Half day</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="attendance">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            placeholder="abc@gmail.com"
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.Attendancesubmit}>Submit</button>
      </form>
    </div>
  )
}
