import React from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';



export default function EmployeeProfile(){
    const navigate = useNavigate()
    return(
        
        <div>
             <h3>profile</h3>
    
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

        <button type="submit" class="button" >save</button>
        <button type="submit" class="submit-btn" onClick={()=>navigate('/Attendacegive')}>Attendance</button>

    </Form>

        </div>
    )
}