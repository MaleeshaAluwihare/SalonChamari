// EmployeeProfile.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function EmployeeProfile() {
    const navigate = useNavigate();
    const empid = localStorage.getItem('empId');
    const name = localStorage.getItem('empname');

    const [empDetails, setEmpDetails] = useState({});

    useEffect(() => {
        if (empid) {
            axios.get(`http://localhost:8070/SalonEmp/get/${empid}`)
                .then(res => setEmpDetails(res.data))
                .catch(error => console.error("Error fetching employee details:", error));
        }
    }, [empid]);

    return (
        <div>
            <h3>Profile</h3>
            <Form>
                <Form.Group>
                    <Form.Label>Employee ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter Employee ID" value={empDetails.Employee_ID || ''} readOnly />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Employee Name" value={empDetails.Name || ''} readOnly />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Address" value={empDetails.Address || ''} readOnly />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Job Role</Form.Label>
                    <Form.Control type="text" placeholder="Job Role" value={empDetails.jobRole || ''} readOnly />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Daily Salary</Form.Label>
                    <Form.Control type="text" placeholder="Daily Salary" value={empDetails.Salary || ''} readOnly />
                </Form.Group>

                <Button type="submit" className="button">Save</Button>
                <button className="text-decoration-none btn btn-sm btn btn-success" onClick={() => navigate('/Attendacegive')}>Daily  attendance</button>
            </Form>
        </div>
    )
}
