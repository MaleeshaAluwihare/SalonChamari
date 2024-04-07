import React, { useState } from "react"
import axios from "axios";




export default function Attendancepage() {

  const[empId,setemp_ID]=useState("")
  const[jobRole,setjobrole]=useState("")
  const[attendance,setattendance]=useState("")

  function sendData(e){

    e.preventDefault();

    const EmployeeAttendance ={
      empId,
      jobRole,
      attendance
    }

    console.log(EmployeeAttendance)

    axios.post("/Attendancecount/add",EmployeeAttendance).then(()=>{
      alert("Employee added")
    }).catch((err)=>{
      alert(err)
    })
  }
    


  return (
    <div className="container">
    <h3>Enter Attendance Details</h3>
    <form onSubmit={sendData}>
        <div className="mb-3">
        <label htmlFor="name">empId</label>
        <input type="text" className="form-control" id="Id" placeholder="Enter Employee ID" onChange={(e)=>{
          setemp_ID(e.target.value)
        }} />
          
        </div>
        <div className="mb-3">
        <label htmlFor="name">jobRole</label>
        <input type="text" className="form-control" id="job" placeholder="Enter job role" onChange={(e)=>{
          setjobrole(e.target.value);
        }} />          
        </div>
       

        <div className="mb-3">
        <label htmlFor="name">Attendance</label>
        <input type="text" className="form-control" id="job" placeholder="Only you can give the  1 or 0" onChange={(e)=>{
          setattendance(e.target.value);
        }} />          
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
</div>
  )
}
