import React from 'react';
import { DashboardProvider, GlobalProvider } from '../../../context/Pulasthi/globalContext';  
import { GlobalStyle } from '../../../css/Pulasthi/GlobalStyle';  
import Dashboard from '../Dashboard/Dashboard';

const DashboardWrapper = () => {
  return (
    <GlobalProvider>
      <GlobalStyle />
      <Dashboard/>
    </GlobalProvider>
  );
};

export default DashboardWrapper;