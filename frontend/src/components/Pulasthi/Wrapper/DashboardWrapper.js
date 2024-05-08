import React from 'react';
import { GlobalProvider } from '../../../context/Pulasthi/globalContext';  
import { GlobalStyle } from '../../../css/Pulasthi/GlobalStyle';  
import Dashboard from '../Dashboard/Dashboard';

import bg from '../../../images/Pulasthi/hello.png'
import { AppStyled } from '../../../css/Pulasthi/AppStyled';
import { MainLayout } from '../../../css/Pulasthi/Layouts';
import Navigation from '../Navigation/Navigation';

const DashboardWrapper = () => {
  return (
    <GlobalProvider>
      <GlobalStyle />
      <AppStyled bg={bg}>
        <MainLayout>
         <Navigation/>
          <main>
          <Dashboard/>
          </main>
        </MainLayout>
      </AppStyled>
    </GlobalProvider>
  );
};

export default DashboardWrapper;