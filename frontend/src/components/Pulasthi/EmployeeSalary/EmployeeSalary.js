import React, { useEffect } from "react"
import styled from "styled-components"
import { InnerLayout } from "../../../css/Pulasthi/Layouts";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import EmployeeItems from "./EmployeeItems";
import EmpSalaryForm from "../Form/EmpSalaryForm";

function EmployeeSalary() {

  const {employees,getEmployeeDetails} = useGlobalContext();

  useEffect(()=>{
    getEmployeeDetails();
  },[])

  return (
    <InnerLayout>
    <EmployeeSalaryStyled>
     <h1>Employee Salary</h1>

      <div className="emp-content">

        <div className="form-container">
            <EmpSalaryForm/>
        </div>
          
          <div className="items">
              {employees.map((employee) => (
                  
                  // one functional component access another component
                  <EmployeeItems
                      key={employee._id}
                      empId={employee.empId}
                      attendance={employee.attendance}
                      date={employee.date}
                      jobRole={employee.jobRole}
                      salary={employee.salary}
                      indicatorColor="var(--color-DarkYellow)"
                      
                  />
              ))}
          </div>
      </div>
    </EmployeeSalaryStyled>
    </InnerLayout>
  )
};

const EmployeeSalaryStyled = styled.div`
  /* display: flex;
  overflow: auto; */
    h1{
        margin-bottom:2rem;
        color: #222260;
        font-weight:bold
    }

    /* put form content and emp item contents into one horizontal flex box */
    .emp-content{
        display: flex;
        gap: 2rem;
        .items{
            flex:1;
        }
    }

    /* Adjust the size of form */
    .form-container {
      min-width: 550px; 
      min-height: 400px; 
    }
`;


export default EmployeeSalary





