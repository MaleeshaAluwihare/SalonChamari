import React, { useState } from "react";
import axios from "axios";


export default function AddEmployee(){

    const[Employee_ID, setEmployee_ID] =useState("")
    const[Name, setName] =useState("")
    const[Address, setAddress] =useState("")
    const[jobRole, setjobRole] =useState("")
    const[Salary, setsalary] =useState("")

    function sendData(e){
       
     e.preventDefault();
        
     const newEmployee ={
        Employee_ID,
        Name,
        Address,
        jobRole,
        Salary
     };
     console.log(newEmployee)

     axios.post("/SalonEmp/add",newEmployee).then(()=>{
        alert("Employee added")

       

    }).catch((err)=>{
        alert(err)
    })


    }
    return(
        
        <div>
             <h3>Add Employee Details</h3>
    
        <form onSubmit={sendData}>
        <div className="form-group">
            <label htmlFor="name">Employee_ID</label>
            <input type="text" className="form-control" id="name" placeholder="Enter Employee ID" onChange={(e)=>{
                setEmployee_ID(e.target.value);
            }}/>

        </div>

        <div className="form-group">
            <label htmlFor="name">Employee Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter Employee Name" onChange={(e)=>{
                setName(e.target.value);
            }}/>
        </div>

        <div className="form-group">
            <label htmlFor="name">Address</label>
            <input type="text" className="form-control" id="name" placeholder="Address" onChange={(e)=>{
                setAddress(e.target.value);
            }}/> 
        </div>

        <div className="form-group">
            <label htmlFor="name">jobRole</label>
            <input type="text" className="form-control" id="name" placeholder="jobRole" onChange={(e)=>{
                setjobRole(e.target.value);
            }}/>
        </div>

        <div className="form-group">
            <label htmlFor="name"> Salary</label>
            <input type="text" className="form-control" id="name" placeholder="Daily Salary" onChange={(e)=>{
                setsalary(e.target.value);
            }}/>
        </div>

        <button type="submit" className="button" >Submit</button>

    </form>

        </div>
    )
}
