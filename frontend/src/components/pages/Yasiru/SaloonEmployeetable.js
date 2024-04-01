import React,{useState,useEffect} from "react";
import axios from "axios";

export default function SaloonEmployeetable(){

  const [employee, setEmployee] = useState([]);

  useEffect(() => {

    function getEmployee() {
        axios.get("/SalonEmp/").then((res) => {
            setEmployee(res.data)
        }).catch((err) => {
            alert(err.message);
        })
    }
    getEmployee();
}, [])



    return (
        <div>
            <h3>Saloon Employee Table</h3>
    <table class="table">
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
                        <tr>
                            <td>{Employee.Employee_ID}</td>
                            <td>{Employee.Name}</td>
                            <td>{Employee.Address}</td>
                            <td>{Employee.Qualification}</td>
                            <td>{Employee.Salary}</td>
                        </tr>
                    ))}
      </tbody>
    </table>
        </div>
    )
}

