import React from "react"




export default function attendancepage() {


  return (
    <div className="container">
    <h3>Enter Attendance Details</h3>
    <form >
        <div className="mb-3">
            <label htmlFor="EmployeeID" className="form-label">empId:</label>
          
        </div>
        <div className="mb-3">
            <label htmlFor="JobRole" className="form-label">jobRole:</label>
          
        </div>
        <div className="mb-3">
            <label htmlFor="Date" className="form-label">Date:</label>
     
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
</div>
  )
}
