import React from 'react';
import { GlobalProvider, IncomeProvider } from '../../../context/Pulasthi/globalContext';  
import { GlobalStyle } from '../../../css/Pulasthi/GlobalStyle';  
import Income from '../Income/Income';
import Inventory from '../InventoryItems/Inventory';

const InventoryWrapper = () => {
  return (
    <GlobalProvider>
      <GlobalStyle />
      <Inventory/>
    </GlobalProvider>
  );
};

export default InventoryWrapper;