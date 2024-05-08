import React, { useState } from "react";
import axios from "axios";
import style from "../../css/Yasiru/AddEmployeeStyle.module.css";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();

    const [Employee_ID, setEmployee_ID] = useState("");
    const [Name, setName] = useState("");
    const [Address, setAddress] = useState("");
    const [Category, setCategory] = useState("Salon");
    const [jobRole, setjobRole] = useState("");
    const [Salary, setsalary] = useState("");
    const [Password, setPassword] = useState("");
    const [email, setemail] = useState("");

    function sendData(e) {
        e.preventDefault();

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
    
        

        const newEmployee = {
            Employee_ID,
            Name,
            Address,
            Category,
            jobRole,
            Salary,
            Password,
            email
        };
        console.log(newEmployee);

        axios.post("/SalonEmp/add", newEmployee)
            .then(() => {
                alert("Employee added");
                navigate("/EmpDash");
            })
            .catch((err) => {
                alert(err);
            });
    }

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
      // Regular expression for validating address (first letter capital, alphanumeric, spaces, commas, apostrophes, hyphens)
      const regex = /^[A-Z][a-zA-Z0-9\s,'-]*$/;
      return regex.test(address);
    };

   const handlejobRoleChange = (jobRole) => {
  // Regular expression for validating job role (first letter capital, alphabetic, spaces, commas, apostrophes, hyphens)
  const regex = /^[A-Z][a-zA-Z\s,'-]*$/;
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
        <div className={style.addEmployeeContainer}>
            <h3 className={style.addName}>Add Employee Details</h3>
            <form onSubmit={sendData} className={style.addForm}>
                <div className={style.addEmployee}>
                    <label htmlFor="name">Employee ID</label>
                    <input
                        type="text"
                        className={style.formControl}
                        id="name"
                        placeholder="Enter Employee ID"
                        required
                        onChange={(e) => setEmployee_ID(e.target.value)}
                    />
                </div>

                <div className={style.addEmployee}>
                    <label htmlFor="name">Employee Name</label>
                    <input
                        type="text"
                        className={style.formControl}
                        id="name"
                        placeholder="Enter Employee Name"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className={style.addEmployee}>
                    <label htmlFor="name">Address</label>
                    <input
                        type="text"
                        className={style.formControl}
                        id="name"
                        placeholder="Address"
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className={style.addEmployee}>
                    <label htmlFor="category">Category</label>
                    <select
                        className={style.formControl}
                        id="category"
                        value={Category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Salon">Salon</option>
                        <option value="Photography">Photography</option>
                    </select>
                </div>

                <div className={style.addEmployee}>
                    <label htmlFor="name">Job Role</label>
                    <input
                        type="text"
                        className={style.formControl}
                        id="name"
                        placeholder="Job Role"
                        required
                        onChange={(e) => setjobRole(e.target.value)}
                    />
                </div>

                <div className={style.addEmployee}>
                    <label htmlFor="name">Salary</label>
                    <input
                        type="text"
                        className={style.formControl}
                        id="name"
                        placeholder="Daily Salary"
                        required
                        onChange={(e) => setsalary(e.target.value)}
                    />
                </div>

                <div className={style.addEmployee}>
                    <label htmlFor="name">Password</label>
                    <input
                        type="text"
                        className={style.formControl}
                        id="Password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className={style.addEmployee}>
                    <label htmlFor="name">Email</label>
                    <input
                        type="text"
                        className={style.formControl}
                        id="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setemail(e.target.value)}
                    />
                </div>

                <button type="submit" className={style.addButton}>Submit</button>
            </form>
        </div>
    );
}
