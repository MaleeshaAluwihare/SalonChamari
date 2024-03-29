import React,{useState} from "react";
import Table from 'react-bootstrap/Table';



function SaloonEmployeetable() {
    return (
        <div>
            <h3>Saloon Employee Table</h3>
    <Table>
      <thead>
        <tr>
          <th>Employee_ID</th>
          <th>Name</th>
          <th>Address</th>
          <th>Qualification</th>
          <th>Daily Salary</th>
          <th>Attendance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>E01</td>
          <td>Kamal</td>
          <td>Kandy</td>
          <td>NVQ6</td>
          <td>RS.1000</td>
          <th>21</th>

        </tr>

     
     
      </tbody>
    </Table>
        </div>
    )
}

export default SaloonEmployeetable;