// ProfileLogin.js
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ProfileLogin() {
    const navigate = useNavigate();

    const [value, setValue] = useState({
        Employee_ID: '',
        Name: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8070/SalonEmp/getloggeduser", { id: value.Employee_ID, name: value.Name })
            .then(res => {
                console.log(res);
                if (res.data) {
                    localStorage.setItem('empId', value.Employee_ID);
                    localStorage.setItem('empname', value.Name);
                    navigate('/profile');
                } else {
                    console.log("User not found");
                    // Handle user not found case
                }
            })
            .catch(error => {
                console.error("Error:", error);
                // Handle error appropriately, e.g., show error message to user
            });
    }

    return (
        <div className='d-flex justify-content-center align-items'>
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
                        className='form-control-rounded-0'
                    />
                </div>
                <div>
                    <label htmlFor="Name">Name:</label>
                    <input
                        type='text'
                        name="Name"
                        autoComplete='off'
                        placeholder='Enter your Name'
                        value={value.Name}
                        onChange={(e) => setValue({ ...value, Name: e.target.value })}
                        className='form-control-rounded-0'
                    />
                </div>
                <Button type="submit" className="submit-btn">Submit</Button>
            </Form>
        </div>
    );
}
