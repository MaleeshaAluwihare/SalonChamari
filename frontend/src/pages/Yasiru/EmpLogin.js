// ProfileLogin.js
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../css/Yasiru/profilelogingStyle.module.css'; // Import CSS module

export default function ProfileLogin() {
  const navigate = useNavigate();
  const [value, setValue] = useState({ Employee_ID: '', Password: '', email: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8070/SalonEmp/login", {
      Employee_ID: value.Employee_ID,
      Password: value.Password,
      email: value.email
    })
      .then(res => {
        console.log(res);
        if (res.data) {
          localStorage.setItem('empId', value.Employee_ID);
          localStorage.setItem('empname', value.Password);
          localStorage.setItem('empemail', value.email);
          navigate('/profile'); // Navigate to profile page
        } else {
          console.log("User not found"); // Handle user not found case
        }
      })
      .catch(error => {
        console.error("Error:", error); // Handle error appropriately, e.g., show error message to user
      });
  }

  return (
    <div className={styles.profileLoging}> {/* Use className from module.css */}
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="EmployeeID">Employee ID:</label>
          <input
            type='text'
            name="EmployeeID"
            autoComplete='off'
            placeholder='Enter Employee ID'
            value={value.Employee_ID}
            onChange={(e) => setValue({ ...value, Employee_ID: e.target.value })}
            className={styles.formControl} 
          />
        </div>
        <div>
          <label htmlFor="Name">Password:</label>
          <input
            type='text'
            name="Name"
            autoComplete='off'
            placeholder='Enter your Name'
            value={value.Password}
            onChange={(e) => setValue({ ...value, Password: e.target.value })}
            className={styles.formControl} 
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type='text'
            name="email"
            autoComplete='off'
            placeholder='Enter your email'
            value={value.email}
            onChange={(e) => setValue({ ...value, email: e.target.value })}
            className={styles.formControl} 
          />
        </div>
        {/* <Link to="/ForgetPassword">Forgot Password</Link> */}
        <Button type="submit" className={styles.submitBtn}>Submit</Button> {/* Use className from module.css */}
      </Form>
    </div>
  );
}
