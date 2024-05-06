import React, { useState } from "react";
import axios from "axios";
import style from "../../css/Yasiru/UpdateStyle.module.css";

export default function EditEmployeeDetails() {
  const [employee_id, setEmployeeID] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [salary, setSalary] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [Image, setImage] = useState("");

  const getEmployeeDetails = () => {
    axios.get(`/SalonEmp/get/${employee_id}`)
      .then((res) => {
        const employeeData = res.data.Employee;
        if (employeeData) {
          setName(employeeData.Name);
          setAddress(employeeData.Address);
          setCategory(employeeData.Category);
          setJobRole(employeeData.jobRole);
          setSalary(employeeData.Salary);
          setPassword(employeeData.Password);
          setemail(employeeData.email);
          setImage(employeeData.Image);
        } else {
          alert("Employee not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching employee details:", err);
        alert("Error fetching employee details");
      });
  };

  const sendData = (e) => {
    if (!handleNameChange(name)) {
      alert("Entered Name is not valid");
      return;
    }

    if (!handleAddressChange(address)) {
      alert("Entered Address is not valid");
      return;
    }

    if (!handlejobRoleChange(jobRole)) {
      alert("Entered jobrole is not valid");
      return;
    }

    if (!handleSalaryChange(salary)) {
      alert("Entered Salary is not valid");
      return;
    }

    if (!handlePasswordChange(password)) {
      alert("Entered password is not valid");
      return;
    }

    if (!handleEmailChange(email)) {
      alert("Entered email is not valid");
      return;
    }

    e.preventDefault();
    const updatedEmployee = {
      Name: name,
      Address: address,
      Category: category,
      jobRole: jobRole,
      Salary: salary,
      Password: password,
      email: email,
      Image: Image,
    };

    axios.put(`/SalonEmp/update/${employee_id}`, updatedEmployee)
      .then(() => {
        alert("Employee updated successfully");
        setEmployeeID("");
        setName("");
        setAddress("");
        setCategory("");
        setJobRole("");
        setSalary("");
        setPassword("");
        setemail("");
        setImage("");
      })
      .catch((err) => {
        if (err.response) {
          console.error("Error updating employee:", err.response.data.message);
          alert(`Error updating employee: ${err.response.data.message}`);
        } else if (err.request) {
          console.error("Error updating employee:", err.request);
          alert("Error updating employee: No response from server");
        } else {
          console.error("Error updating employee:", err.message);
          alert(`Error updating employee: ${err.message}`);
        }
      });
  };

  const handleNameChange = (name) => {
    const regex = /^[A-Z][a-z]*$/;
    return regex.test(name);
  };

  const handleAddressChange = (address) => {
    const regex = /^[A-Z][a-z]*$/;
    return regex.test(address);
  };

  const handlejobRoleChange = (jobRole) => {
    const regex = /^[A-Z][a-z]*$/;
    return regex.test(jobRole);
  };

  const handleSalaryChange = (salary) => {
    const regex = /^\d*$/;
    return regex.test(salary);
  };

  const handlePasswordChange = (password) => {
    const regex = /^[A-Z]\d*[!@#$%&]$/;
    return regex.test(password);
  };

  const handleEmailChange = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className={style.container}>
      <h3 className={style.heading}>Edit Employee Details</h3>
      <div className={style.updateForm}>
        <label htmlFor="EmployeeID" className={style.label}>Enter Employee ID: </label>
        <input type="text" id="EmployeeID" value={employee_id} onChange={(e) => setEmployeeID(e.target.value)} className={style.input} />
        <button type="button" onClick={getEmployeeDetails} className={style.button}>Search</button>
      </div>
      {employee_id && (
        <div className={style.updateDetails}>
          <form onSubmit={sendData}>
            <label className={style.label}>Name:</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={style.input} />
            <label className={style.label}>Address:</label>
            <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className={style.input} />
            <label className={style.label}>Category:</label>
            <input type="text" required value={category} onChange={(e) => setCategory(e.target.value)} className={style.input} />
            <label className={style.label}>Job Role:</label>
            <input type="text" required value={jobRole} onChange={(e) => setJobRole(e.target.value)} className={style.input} />
            <label className={style.label}>Salary:</label>
            <input type="text" required value={salary} onChange={(e) => setSalary(e.target.value)} className={style.input} />
            <label className={style.label}>Password:</label>
            <input type="text" required value={password} onChange={(e) => setPassword(e.target.value)} className={style.input} />
            <label className={style.label}>Email:</label>
            <input type="text" required value={email} onChange={(e) => setemail(e.target.value)} className={style.input} />
            <button type="submit" className={style.button}>Update</button>
          </form>
        </div>
      )}
    </div>
  );
}
