import React,{useState} from "react";
import Table from 'react-bootstrap/Table';



function Employeereservation() {
    return (
        <div>
            <h3> Employee reservation Table</h3>
    <Table>
      <thead>
        <tr>
          <th>Reservation ID</th>
          <th>Date</th>
          <th>Time</th>
          <th>Employee ID</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>R01</td>
          <td>03/04/2024</td>
          <td>12.00pm</td>
          <td>E01</td>
        </tr>

     
     
      </tbody>
    </Table>
        </div>
    )
}

export default Employeereservation;