
import React from 'react';
import { BudgetProvider, GlobalProvider } from '../../../context/Pulasthi/globalContext';  

import { GlobalStyle } from '../../../css/Pulasthi/GlobalStyle';  
import Budget from '../Budget/Budget';

const BudgetWrapper = () => {
  return (
    <GlobalProvider>
      <GlobalStyle/>
      <Budget/>
    </GlobalProvider>
  );
};

export default BudgetWrapper;
