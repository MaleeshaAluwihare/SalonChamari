import React from 'react';
import { GlobalProvider } from '../../../context/Pulasthi/globalContext';  
import { GlobalStyle } from '../../../css/Pulasthi/GlobalStyle';  
import Inventory from '../InventoryItems/Inventory';

import bg from '../../../images/Pulasthi/hello.png'
import { AppStyled } from '../../../css/Pulasthi/AppStyled';
import { MainLayout } from '../../../css/Pulasthi/Layouts';
import Navigation from '../Navigation/Navigation';

const InventoryWrapper = () => {
  return (
    <GlobalProvider>
      <GlobalStyle />
      <AppStyled bg={bg}>
        <MainLayout>
         <Navigation/>
          <main>
          <Inventory/>
          </main>
        </MainLayout>
      </AppStyled>
    </GlobalProvider>
  );
};

export default InventoryWrapper;