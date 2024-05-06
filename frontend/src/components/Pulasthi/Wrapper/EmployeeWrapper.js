import React from 'react';
import { GlobalProvider } from '../../../context/Pulasthi/globalContext';  
import { GlobalStyle } from '../../../css/Pulasthi/GlobalStyle';  
import EmployeeSalary from '../EmployeeSalary/EmployeeSalary';

import bg from '../../../images/Pulasthi/hello.png'
import { AppStyled } from '../../../css/Pulasthi/AppStyled';
import { MainLayout } from '../../../css/Pulasthi/Layouts';
import Navigation from '../Navigation/Navigation';

const EmployeeWrapper = () => {
  return (
    <GlobalProvider>
      <GlobalStyle />
      <AppStyled bg={bg}>
        <MainLayout>
         <Navigation/>
          <main>
          <EmployeeSalary/>
          </main>
        </MainLayout>
      </AppStyled>
    </GlobalProvider>
  );
};

export default EmployeeWrapper;