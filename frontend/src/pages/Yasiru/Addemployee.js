import React,{useState} from "react";
import Form from 'react-bootstrap/Form';
import axios from "axios";



export default function Addemployee(){

    const[Employee_ID, setEmployee_ID] =useState("")
    const[Name, setName] =useState("")
    const[Address, setAddress] =useState("")
    const[Qualification, setQualification] =useState("")
    const[Salary, setsalary] =useState("")

    function sendData(e){
       
     e.preventDefault();
    

     
     
        
     const newEmployee ={
        Employee_ID,
        Name,
        Address,
        Qualification,
        Salary
     }

     axios.post("/SalonEmp/add",newEmployee).then(()=>{
        alert("Employee added")

       

    }).catch((err)=>{
        alert(err)
    })


    }
    return(
        
        <div>
             <h3>Add Employee Details</h3>
    
        <Form onSubmit={sendData}>
        <div class="form-group">
            <lable  for ="name">Employee ID</lable>
            <input type ="text"className="form-control" id="name" placeholder="Enter Employee ID" onChange={(e)=>{
                setEmployee_ID(e.target.value);


            }}/>

        </div>

        <div class="form-group">
            <lable  for ="name">Employee Name</lable>
            <input type ="text"className="form-control" id="name" placeholder="Enter Employee Name"onChange={(e)=>{
                setName(e.target.value);


            }}/>
        </div>

        <div class="form-group">
            <lable  for ="name">Address</lable>
            <input type ="text"className="form-control" id="name" placeholder="Address"onChange={(e)=>{
                
                setAddress(e.target.value);


            }}/> 
        </div>

        <div class="form-group">
            <lable  for ="name">Qualification</lable>
            <input type ="text"className="form-control" id="name" placeholder="Qualification"onChange={(e)=>{
                
                setQualification(e.target.value);


            }}/>
        </div>

        <div class="form-group">
            <lable  for ="name"> Salary</lable>
            <input type ="text"className="form-control" id="name" placeholder="Daily Salary"onChange={(e)=>{
                
                setsalary(e.target.value);


            }}/>
        </div>

         

        <button type="submit" class="button" >Submit</button>

    </Form>

        </div>
    )
}