import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SaloonEmployeetable() {
  const [employee, setEmployee] = useState([]);
  const [EmployeeID, setEmployee_ID] = useState("");

  useEffect(() => {
    function getEmployee() {
      axios.get("/SalonEmp/").then((res) => {
        setEmployee(res.data);
      }).catch((err) => {
        alert(err.message);
      });
    }
    getEmployee();
  }, []);

  const deleteEmployee = (employeeID) => {
    axios.delete(`/SalonEmp/delete/${employeeID}`).then(res => {
      alert('Employee deleted');
      // Update the employee list after deletion if necessary
    }).catch(error => {
      alert(error.response.data.status);
    });
  };

  return (
    <div>
      <h3>Saloon Employee Table</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Employee_ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Qualification</th>
            <th>Daily Salary</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((Employee) => (
            <tr key={Employee.Employee_ID}>
              <td>{Employee.Employee_ID}</td>
              <td>{Employee.Name}</td>
              <td>{Employee.Address}</td>
              <td>{Employee.Qualification}</td>
              <td>{Employee.Salary}</td>
              <td>
                <button className='text-decoration-none btn btn-sm btn btn-success'>update</button>
                <button className='text-decoration-none btn btn-sm btn btn-danger mx-1' onClick={() => deleteEmployee(Employee.Employee_ID)}>Delete</button>
                <button className="text-decoration-none btn btn-sm btn btn-success">Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
