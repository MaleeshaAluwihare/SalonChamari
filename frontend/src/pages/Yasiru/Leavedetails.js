import axios from "axios";
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from "react";
import EmailForm from '../../pages/Yasiru/EmailSend';
import styles from "../../css/Yasiru/LeavetableStyle.module.css";

export default function Leavedetails() {
  const [LeaveData, setLeavedata] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    function getLeaves() {
      axios.get("/Leave/all")
        .then((res) => {
          setLeavedata(res.data);
        })
        .catch((err) => {
          console.error("Error fetching attendance data:", err);
        });
    }
    getLeaves();
  }, []);

  const deleteEmployee = (Employee_ID) => {
    axios.delete(`/Leave/delete/${Employee_ID}`)
      .then(res => {
        alert('Employee deleted');
      })
      .catch(error => {
        alert(error.response.data.status);
      });
  };

  const handleEmailClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleEmailClose = () => {
    setSelectedEmployee(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/Mailsend/mail', { email });
      setMessage('Email sent successfully!');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to send email.');
    }
  };

  return (
    <div className={styles.container}>
      <Table striped bordered hover className={styles.attendancereport}>
        <>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeader}>Employee_ID</th>
              <th className={styles.tableHeader}>date</th>
              <th className={styles.tableHeader}>type</th>
              <th className={styles.tableHeader}>email</th>
              <th className={styles.tableHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {LeaveData.map((employee) => (
              <tr key={`${employee.Employee_ID}_${employee.type}`}>
                <td>{employee.Employee_ID}</td>
                <td>{employee.date}</td>
                <td>{employee.type}</td>
                <td>{employee.email}</td>
                <td>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.primary} ${styles.mx1}`}
                    onClick={() => handleEmailClick(employee)}
                  >
                    Send Email
                  </button>
                  <button
                    type="submit"
                    className={`${styles.btn} ${styles.danger} ${styles.mx1}`}
                    onClick={() => deleteEmployee(employee.Employee_ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </>
      </Table>
      {selectedEmployee && (
        <EmailForm
          initialEmail={selectedEmployee.email}
          onClose={handleEmailClose}
        />
      )}
    </div>
  );
}