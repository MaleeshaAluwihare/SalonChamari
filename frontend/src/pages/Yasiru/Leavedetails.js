import axios from "axios";
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from "react";
import EmailForm from '../../pages/Yasiru/EmailSend';

export default function Leavedetails() {
  const [LeaveData, setLeavedata] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // New state for selected employee
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
          // Display an error message to the user or handle the error appropriately
        });
    }

    // Fetch attendance data on component mount
    getLeaves();
  }, []);

  const deleteEmployee = (Employee_ID) => {
    axios.delete(`/Leave/delete/${Employee_ID}`)
      .then(res => {
        alert('Employee deleted');
        // Update the employee list after deletion if necessary
      })
      .catch(error => {
        alert(error.response.data.status);
      });
  };

  const handleEmailClick = (employee) => {
    setSelectedEmployee(employee); // Set the selected employee
  };

  const handleEmailClose = () => {
    setSelectedEmployee(null); // Clear the selected employee
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
    <div>
      <Table striped bordered hover className="attendancereport">
        <>
          <thead>
            <tr>
              <th>Employee_ID</th>
              <th>date</th>
              <th>type</th>
              <th>email</th>
              <th>Action</th>
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
                    className='text-decoration-none btn btn-sm btn-primary mx-1'
                    onClick={() => handleEmailClick(employee)}
                  >
                    Send Email
                  </button>
                  <button
                    type="submit"
                    className='text-decoration-none btn btn-sm btn btn-danger mx-1'
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