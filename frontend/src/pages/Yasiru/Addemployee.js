import React, { useState } from "react";
import axios from "axios";
import styles from "../../css/Yasiru/AddEmployeeStyle.module.css";

export default function AddEmployee() {
  const [Employee_ID, setEmployee_ID] = useState("");
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Category, setCategory] = useState("Salon");
  const [jobRole, setjobRole] = useState("");
  const [Salary, setsalary] = useState("");
  const [Password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [Image, setImage] = useState(null);

  const sendData =async(event) =>{
    event.preventDefault();

    if (!handleEmployee_IDChange(Employee_ID)) {
      alert("Entered empId is not valid");
      return;
    }

    if (!handleNameChange(Name)) {
      alert("Entered Name is not valid");
      return;
    }

    if (!handleAddressChange(Address)) {
      alert("Entered Address is not valid");
      return;
    }

    if (!handlejobRoleChange(jobRole)) {
      alert("Entered jobrole is not valid");
      return;
    }

    if (!handleSalaryChange(Salary)) {
      alert("Entered Salary is not valid");
      return;
    }

    if (!handlePasswordChange(Password)) {
      alert("Entered password is not valid");
      return;
    }

    if (!handleEmailChange(email)) {
      alert("Entered email is not valid");
      return;
    }

    const formData = new FormData();
    formData.append("Employee_ID", Employee_ID);
    formData.append("Name", Name);
    formData.append("Address", Address);
    formData.append("Catagory", Category);
    formData.append("jobRole", jobRole);
    formData.append("Salary", Salary);
    formData.append("Password", Password);
    formData.append("email", email)
    formData.append("Image", Image);

    try {
      const response = await axios.post("/Image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Image uploaded successfully!");
        setImage("");
      } else {
        alert("Error: " + response.data.status);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred, please try again.");
    }
  };

  const handleEmployee_IDChange = (id) => {
    // Regular expression for validating Employee ID
    const regex = /^[E]\d*$/;
    return regex.test(id);
  };

  const handleNameChange = (name) => {
    // Regular expression for validating employee name
    const regex = /^[A-Z][a-z]*$/;
    return regex.test(name);
  };

  const handleAddressChange = (address) => {
    // Regular expression for validating address
    const regex = /^[a-zA-Z0-9\s,'-]*$/;
    return regex.test(address);
  };

  const handlejobRoleChange = (jobRole) => {
    // Regular expression for validating job role
    const regex = /^[a-zA-Z\s,'-]*$/;
    return regex.test(jobRole);
  };

  const handleSalaryChange = (salary) => {
    // Regular expression for validating salary
    const regex = /^\d*$/;
    return regex.test(salary);
  };

  const handlePasswordChange = (password) => {
    // Regular expression for validating password
    const regex = /^[A-Z]\d*[!@#$%&]$/;
    return regex.test(password);
  };

  const handleEmailChange = (email) => {
    // Regular expression for validating email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className={styles.addEmployeeContainer}>
      <h3 className={styles.addName}>Add Employee Details</h3>

      <form onSubmit={sendData} className={styles.addForm}>
        <div className={styles.addEmployee}>
          <label htmlFor="Employee_ID">Employee ID</label>
          <input
            type="text"
            className={styles.formControl}
            id="Employee_ID"
            placeholder="Enter Employee ID"
            required
            onChange={(e) => {
              setEmployee_ID(e.target.value);
            }}
          />
        </div>

        <div className={styles.addEmployee}>
          <label htmlFor="Name">Employee Name</label>
          <input
            type="text"
            className={styles.formControl}
            id="Name"
            placeholder="Enter Employee Name"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className={styles.addEmployee}>
          <label htmlFor="Address">Address</label>
          <input
            type="text"
            className={styles.formControl}
            id="Address"
            placeholder="Address"
            required
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>

        <div className={styles.addEmployee}>
          <label htmlFor="Catagory">Category</label>
          <select
            className={styles.formControl}
            id="Catagory"
            required
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Salon">Salon</option>
            <option value="Photography">Photography</option>
          </select>
        </div>

        <div className={styles.addEmployee}>
          <label htmlFor="jobRole">Job Role</label>
          <input
            type="text"
            className={styles.formControl}
            id="jobRole"
            placeholder="Job Role"
            required
            onChange={(e) => {
              setjobRole(e.target.value);
            }}
          />
        </div>

        <div className={styles.addEmployee}>
          <label htmlFor="Salary">Salary</label>
          <input
            type="text"
            className={styles.formControl}
            id="Salary"
            placeholder="Daily Salary"
            required
            onChange={(e) => {
              setsalary(e.target.value);
            }}
          />
        </div>

        <div className={styles.addEmployee}>
          <label htmlFor="Password">Password</label>
          <input
            type="text"
            className={styles.formControl}
            id="Password"
            placeholder="Password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className={styles.addEmployee}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className={styles.formControl}
            id="email"
            placeholder="Email"
            required
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="Image">Choose Image:</label>
          <input
            type="file"
            id="Image"
            onChange={(e) => setImage(e.target.files[0])}
            required
            accept="image/*"
          />
        </div> 


        <button type="submit" className={styles.addButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
