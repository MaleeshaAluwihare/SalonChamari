import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Attendancepage() {
  const [empId, setemp_ID] = useState("");
  const [jobRole, setjobrole] = useState("");
  const [attendance, setattendance] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Set initial value to current date
  const [employeeID,setEmployeeID] = useState([]);

  useEffect(() => {
    const fetchEmployeeID = async () => {
    try{
      const response = await axios.get('/SalonEmp/');
      setEmployeeID(response.data.map(employee => employee.Employee_ID));
    }catch(error){
      console.error("Error fetching data")
    }
  };
  fetchEmployeeID(); 
  },[]);

  function sendData(e) {
    e.preventDefault();

    const EmployeeAttendance = {
      empId,
      jobRole,
      attendance,
      date
    }

    console.log(EmployeeAttendance)

    axios.post("/Attendancecount/add", EmployeeAttendance)
      .then(() => {
        alert("Employee added")
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <div className="container">
      <h3>Enter Attendance Details</h3>
      <form onSubmit={sendData}>
        <div className="mb-3">
          <label htmlFor="name">empId</label>
          <select className="form-control" id ="empId" value={empId} onChange={(e) => setemp_ID(e.target.value)}>
            <option value =" ">Select Employee</option>
          {employeeID.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="name">jobRole</label>
          <input type="text" className="form-control" id="job" placeholder="Enter job role" onChange={(e) => {
            setjobrole(e.target.value);
          }} />
        </div>


        <div className="mb-3">
          <label htmlFor="name">Attendance</label>
          <input type="Number" className="form-control" id="job" placeholder="Only you can give the  1 or 0" onChange={(e) => {
            setattendance(e.target.value);
          }} />
        </div>

        <div className="mb-3">
          <label htmlFor="name">Date</label>
          <input type="text" className="form-control" id="job" value={date} readOnly />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
