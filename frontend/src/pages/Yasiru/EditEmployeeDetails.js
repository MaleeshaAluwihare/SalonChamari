import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

export default function EditEmployeeDetails() {
    const [Employee_ID, setEmployee_ID] = useState("");
    const [Name, setName] = useState("");
    const [Address, setAddress] = useState("");
    const [Category,setCategory]=useState("")
    const [jobRole, setjobRole] = useState("");
    const [Salary, setSalary] = useState("");

    const navigate = useNavigate();

    const getEmployeeDetails = () => {
        axios.get(`/SalonEmp/get/${document.getElementById("EmployeeID").value}`)
            .then((res) => {
                const EmployeeData = res.data.Employee;

                if (EmployeeData) {
                    setName(EmployeeData.Name);
                    setAddress(EmployeeData.Address);
                    setCategory(EmployeeData.Category);
                    setjobRole(EmployeeData.jobRole);
                    setSalary(EmployeeData.Salary);
                } else {
                    alert("Employee not found");
                }
            })
            .catch((err) => {
                alert("Error fetching employee details");
                console.error(err);
            });
    };

    const sendData = (e) => {
        e.preventDefault();

        const updatedEmployee = {
            Name,
            Address,
            Category,
            jobRole,
            Salary
        };

        console.log(updatedEmployee)

        axios.put(`/SalonEmp/update/${Employee_ID}`, updatedEmployee)
            .then(() => {
                alert("Employee updated successfully");

                setEmployee_ID("");
                setName("");
                setAddress("");
                setCategory("");
                setjobRole("");
                setSalary("");
            })
            .catch((err) => {
                console.error(err);
                alert(err.message);
            });
    };

    return (
        <div>
            <h3>Edit Employee Details</h3>
           <div className="container">
                <label htmlFor="EmployeeID">Enter Employee ID: </label>
                <input type="text" id="EmployeeID" value={Employee_ID} onChange={(e) => setEmployee_ID(e.target.value)} />
                <button type="button" onClick={getEmployeeDetails}>Search</button>
            </div>
            {Employee_ID && (
                <div className="container">
                    <form onSubmit={sendData}>
                        <label>Name:</label>
                        <input type="text" value={Name} onChange={(e) => setName(e.target.value)} />
                        <label>Address:</label>
                        <input type="text" value={Address} onChange={(e) => setAddress(e.target.value)} />
                        <label>Category:</label>
                        <input type="text" value={Category} onChange={(e) => setCategory(e.target.value)} />
                        <label>jobRole:</label>
                        <input type="text" value={jobRole} onChange={(e) => setjobRole(e.target.value)} />
                        <label>Salary:</label>
                        <input type="text" value={Salary} onChange={(e) => setSalary(e.target.value)} />
                        <button type="submit">Update</button>
                    </form>
                </div>
            )}
        </div>
    );
}
