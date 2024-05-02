import React from 'react';
import { GlobalProvider } from '../../../context/Pulasthi/globalContext';  
import { GlobalStyle } from '../../../css/Pulasthi/GlobalStyle';  
import EmployeeSalary from '../EmployeeSalary/EmployeeSalary';

const EmployeeWrapper = () => {
  return (
    <GlobalProvider>
      <GlobalStyle />
      <EmployeeSalary/>
    </GlobalProvider>
  );
};

export default EmployeeWrapper;