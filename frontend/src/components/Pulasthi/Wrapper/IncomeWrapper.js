import React from 'react';
import { GlobalProvider, IncomeProvider } from '../../../context/Pulasthi/globalContext';  
import { GlobalStyle } from '../../../css/Pulasthi/GlobalStyle';  
import Income from '../Income/Income';

const IncomeWrapper = () => {
  return (
    <GlobalProvider>
      <GlobalStyle />
      <Income/>
    </GlobalProvider>
  );
};

export default IncomeWrapper;