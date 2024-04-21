import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddEmployee from "./Addemployee";
import { BarChart } from "../../components/Yasiru/bar";
import { PieChart } from "../../components/Yasiru/Pie";
import { LineChartData } from "../../components/Yasiru/Data";
import { LineGraph } from "../../components/Yasiru/Line";

export default function SaloonEmployeetable() {
  const [employee, setEmployee] = useState([]);
  const [EmployeeID, setEmployee_ID] = useState(""); //delete
  const [category, setCategory] = useState("salon"); // Category state

  const navigate = useNavigate();

  useEffect(() => {
    function getEmployee() {
      axios.get(`/SalonEmp/?category=${category}`).then((res) => {
        console.log(res.data);
        setEmployee(res.data);
      }).catch((err) => {
        alert(err.message);
      });
    }
    getEmployee();
  }, [category]); // Fetch data when category changes

  const deleteEmployee = (EmployeeID) => {
    axios.delete(`/SalonEmp/delete/${EmployeeID}`).then(res => {
      alert('Employee deleted');
      // Update the employee list after deletion if necessary
    }).catch(error => {
      alert(error.response.data.status);
    });
  };

  return (
    <>
      <div>
        <h3>Saloon Employee Table</h3>
        {/* Category dropdown */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="salon">Salon</option>
          <option value="studio">Studio</option>
        </select>
        <table className="table">
          <thead>
            <tr>
              <th>Employee_ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>jobRole</th>
              <th>Daily Salary</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((Employee) => (
              <tr key={Employee.Employee_ID}>
                <td>{Employee.Employee_ID}</td>
                <td>{Employee.Name}</td>
                <td>{Employee.Address}</td>
                <td>{Employee.jobRole}</td>
                <td>{Employee.Salary}</td>
                <td>
                  <button className='text-decoration-none btn btn-sm btn btn-success' onClick={() => navigate(`/Edit`)}>Update</button>
                  <button className='text-decoration-none btn btn-sm btn btn-danger mx-1' onClick={() => deleteEmployee(Employee.EmployeeID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="text-decoration-none btn btn-sm btn btn-success" onClick={() => navigate('/Add')}>Add Employee</button>
      </div>
      
    </>
  );
}
