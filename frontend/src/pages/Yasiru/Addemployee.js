import React, { useState } from "react";
import axios from "axios";
import '../../CSS/Yasiru/AddEmployee.css'

export default function AddEmployee(){

    const[Employee_ID, setEmployee_ID] =useState("")
    const[Name, setName] =useState("")
    const[Address, setAddress] =useState("")
    const[Category, setCategory] = useState("Salon")
    const[jobRole, setjobRole] =useState("")
    const[Salary, setsalary] =useState("")

    function sendData(e){
       
     e.preventDefault();
        
     const newEmployee ={
        Employee_ID,
        Name,
        Address,
        Category,
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
             <h3 className="AddName">Add Employee Details</h3>
    
        <form onSubmit={sendData} className="addform">
        <div className="AddEmployee">
            <label htmlFor="name">Employee_ID</label>
            <input type="text" className="form-control" id="name" placeholder="Enter Employee ID" required onChange={(e)=>{
                setEmployee_ID(e.target.value);
            }}/>

        </div>

        <div className="AddEmployee">
            <label htmlFor="name">Employee Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter Employee Name" required onChange={(e)=>{
                setName(e.target.value);
            }}/>
        </div>

        <div className="AddEmployee">
            <label htmlFor="name">Address</label>
            <input type="text" className="form-control" id="name" placeholder="Address" required onChange={(e)=>{
                setAddress(e.target.value);
            }}/> 
        </div>

        <div className="AddEmployee">
            <label htmlFor="name">Category</label>
            <input type="text" className="form-control" id="name" placeholder="Category" required onChange={(e)=>{
                setCategory(e.target.value);
            }}/> 
        </div>

        {/* <div className="form-group">

            <label htmlFor="Category">

                Category

                <select 

                value={Category}

                onChange={(e) => {

                    setCategory(e.target.value)

                }}
                required
                className="form-control"

                >

                    <option value="Salon">Salon</option>
                    <option value="Photography">Photography</option>


                </select>

            </label>

        </div> */}

        <div className="AddEmployee">
            <label htmlFor="name">jobRole</label>
            <input type="text" className="form-control" id="name" placeholder="jobRole" required onChange={(e)=>{
                setjobRole(e.target.value);
            }}/>
        </div>

        <div className="AddEmployee">
            <label htmlFor="name"> Salary</label>
            <input type="text" className="form-control" id="name" placeholder="Daily Salary" required onChange={(e)=>{
                setsalary(e.target.value);
            }}/>
        </div>

        <button type="submit" className="Addbutton" >Submit</button>

    </form>

        </div>
    )
}
