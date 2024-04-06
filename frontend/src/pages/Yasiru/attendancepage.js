import React from 'react'

export default function attendancepage() {
  return (
    <div className="container">
    <h3>Enter Attendance Details</h3>
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="EmployeeID" className="form-label">:</label>
            <input type="text" className="form-control" id="EmployeeID" value={Employee_ID} onChange={(e) => setEmployee_ID(e.target.value)} />
        </div>
        <div className="mb-3">
            <label htmlFor="JobRole" className="form-label">Job Role:</label>
            <input type="text" className="form-control" id="JobRole" value={JobRole} onChange={(e) => setJobRole(e.target.value)} />
        </div>
        <div className="mb-3">
            <label htmlFor="Date" className="form-label">Date:</label>
            <input type="date" className="form-control" id="Date" value={Date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
</div>
  )
}
