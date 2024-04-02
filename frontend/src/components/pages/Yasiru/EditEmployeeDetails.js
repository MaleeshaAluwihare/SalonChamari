import axios from "axios";
import React,{useState} from "react";
import Form from 'react-bootstrap/Form';



export default function EditEmployeeDetails(){
   const [EmployeeID,setEmployee_ID]=useState("");
    const [Employee,setEmployee]=useState(null);

    const[Name,setName]=useState("");
    const[Address,setAddress]=useState("");
    const[Qualification,setQualification]=useState("");
    const[Salary,setSalary]=useState("");

    const getEmployeeDetails =() =>{
        axios.get(`/SalonEmp/get/${EmployeeID}`).then((res) =>{
            setEmployee(res.data.Employee);

            setName(res.data.Employee.Name);
            setAddress(res.data.Employee.Address);
            setQualification(res.data.Employee.Qualification);
            setSalary(res.data.Employee.Salary);

        }).catch((err)=>{
            alert("Employee Notfound");
        });
    };

    const sendData =(e) =>{
        e.preventDefault();//prevent defails from submission

        const EditEmployeeDetails ={
            Name,
            Address,
            Qualification,
            Salary,
        };
        axios.put(`/SalonEmp/update/${EmployeeID}`,EditEmployeeDetails)
        .then(() =>{
            alert("Employeee updated")
        })
        .catch((err) =>{
            alert(err);
        });
    };
    return(
        
        <div>
             <h3>Edit Employee Details</h3>
    
        <Form>
        <div className="container">
        <label htmlFor="EmployeeID">Enter Employee ID: </label>
        <input type="text" id="EmployeeID" value={EmployeeID} onChange={(e) => setEmployee_ID(e.target.value)} />
        <button onClick={getEmployeeDetails}>Display Details</button>
      </div>

      {Employee && (
        <div className="container">
          <form onSubmit={sendData}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">Name:</label>
              <input type="text" className="form-control" id="Name" value={Name} onChange={(e) => { setName(e.target.value) }} />
            </div>
            <div className="mb-3">
              <label htmlFor="Address" className="form-label">Address:</label>
              <input type="text" className="form-control" id="Address" value={Address} onChange={(e) => { setAddress(e.target.value) }} />
            </div>
            <div className="mb-3">
              <label htmlFor="Qualification" className="form-label">Qualification:</label>
              <input type="text" className="form-control" id="Qualification" value={Qualification} onChange={(e) => { setQualification(e.target.value) }} />
            </div>
            <div className="mb-3">
              <label htmlFor="Salary" className="form-label">Salary:</label>
              <input type="text" className="form-control" id="Salary" value={Salary} onChange={(e) => { setSalary(e.target.value) }} />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </div>
      )}

    </Form>

        </div>
    )
}