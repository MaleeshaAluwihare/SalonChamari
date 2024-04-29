
import React from 'react';
import { BudgetItemProvider, GlobalProvider } from '../../../context/Pulasthi/globalContext';  
import { GlobalStyle } from '../../../css/Pulasthi/GlobalStyle';  
import BudgetItem from '../BudgetItem/BudgetItem';

const BudgetWrapper = () => {
  return (
    <GlobalProvider>
      <GlobalStyle />
      <BudgetItem />
    </GlobalProvider>
  );
};

export default BudgetWrapper;
