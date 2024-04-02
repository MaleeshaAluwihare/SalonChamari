import React,{useState} from "react";
import Form from 'react-bootstrap/Form';



export default function EditEmployeeDetails(){
   /*const [EmployeeID,setEmployee_ID]=useState("");
    const [Employee,setEmployee]=useState(null);

    const[Name,setName]=useState("");
    const[Address,setAddress]=useState("");
    const[Qualification,setQualification]=useState("");
    const[Salary,setSalary]=useState("");

    const getEmployeeDetails =() =>{
        axios.get
    }*/
    return(
        
        <div>
             <h3>Edit Employee Details</h3>
    
        <Form>
        <div class="form-group">
            <lable  for ="name">Employee ID</lable>
            <input type ="text"class="form-control" id="name" placeholder="Enter Employee ID"/>

        </div>

        <div class="form-group">
            <lable  for ="name">Employee Name</lable>
            <input type ="text"class="form-control" id="name" placeholder="Enter Employee Name"/>
        </div>

        <div class="form-group">
            <lable  for ="name">Address</lable>
            <input type ="text"class="form-control" id="name" placeholder="Address"/> 
        </div>

        <div class="form-group">
            <lable  for ="name">Qualification</lable>
            <input type ="text"class="form-control" id="name" placeholder="Qualification"/>
        </div>

        <div class="form-group">
            <lable  for ="name">Daily Salary</lable>
            <input type ="text"class="form-control" id="name" placeholder="Daily Salary"/>
        </div>

        <button type="submit" class="button" >Submit</button>

    </Form>

        </div>
    )
}