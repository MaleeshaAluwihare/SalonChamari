import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "../../css/Yasiru/EmployeetableStyle.module.css";

export default function SaloonEmployeetable() {
  const [employee, setEmployee] = useState([]);
  const [Employee_ID, setEmployee_ID] = useState(""); //delete
  const [selectedCategory, setSelectedCategory] = useState("All"); // Category state
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const fetchData = () => {
    let url = "/SalonEmp/filter";
    if (selectedCategory !== "All") {
      url += `?category=${selectedCategory}`;
    }
    axios
      .get(url)
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deleteEmployee = (Employee_ID) => {
    axios
      .delete(`/SalonEmp/delete/${Employee_ID}`)
      .then((res) => {
        alert("Employee deleted");
        // Update the employee list after deletion if necessary
      })
      .catch((error) => {
        alert(error.response.data.status);
      });
  };

  const filteredEmployee = employee.filter((employee) => {
    if (!searchInput.trim()) return true;
    const searchLowerCase = searchInput.trim().toLowerCase();
    return (
      employee.Employee_ID.toLowerCase().includes(searchLowerCase) ||
      employee.Name.toLowerCase().includes(searchLowerCase)
    );
  });

  return (
    <>
      <div className={style.SearchBar}>
        <input
          type="text"
          placeholder="Enter ID "
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <button
          className={`btn btn-sm btn-primary mx-1 ${style.SearchBarbutton}`}
          onClick={() => setSearchInput("")}
        >
          Search
        </button>
      </div>
      <div>
        Category dropdown
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Salon">Salon</option>
          <option value="Photography">Photography</option>
        </select>

        <table className={style.EmployeeDetailstable}>
          <thead>
            <tr>
              <th>Employee_ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Category</th>
              <th>Job role</th>
              <th>Daily Salary</th>
              <th>Password</th>
              <th>email</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployee.map((employee) => (
              <tr key={employee.Employee_ID}>
                <td>{employee.Employee_ID}</td>
                <td>{employee.Name}</td>
                <td>{employee.Address}</td>
                <td>{employee.Category}</td>
                <td>{employee.jobRole}</td>
                <td>{employee.Salary}</td>
                <td>{employee.Password}</td>
                <td>{employee.email}</td>
                <td>{employee.Image}</td>

                <td>
                  <button
                    className={style.deleteButton}
                    onClick={() => deleteEmployee(employee.Employee_ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={style.addSaloonButton} onClick={() => navigate("/Add")}>
          Add Employee
        </button>

        <button className={style.updateButton} onClick={() => navigate(`/Edit`)}>
          Update
        </button>
      </div>
    </>
  );
}
