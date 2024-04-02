import React, { useState } from "react";
import axios from "axios";

export default function DeleteEmployeedatials() {

    const [EmployeeID, setEmployee_ID] = useState("");

    const deleteEmployee = (employeeID) => {

        axios.delete(`/SalonEmp/delete/${EmployeeID}`).then(res => {

            alert('Employee deleted');

        }).catch(error => {

            alert(error.response.data.status);

        });
    };

   /* return (
        <div>
            <div className="container">
                <label htmlFor="EmployeeID">Enter Employee ID: </label>
                <input type="text" id="EmployeeID" value={EmployeeID} onChange={(e) => setEmployee_ID(e.target.value)} />
                <button onClick={deleteEmployee}>Delete</button>
            </div>
        </div>
    );*/
};


