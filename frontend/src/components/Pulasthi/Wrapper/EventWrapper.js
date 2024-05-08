import React from 'react';
import { GlobalProvider } from '../../../context/Pulasthi/globalContext';  
import { GlobalStyle } from '../../../css/Pulasthi/GlobalStyle';  
import EventPackages from '../EventPackages/EventPackages';

import bg from '../../../images/Pulasthi/hello.png'
import { AppStyled } from '../../../css/Pulasthi/AppStyled';
import { MainLayout } from '../../../css/Pulasthi/Layouts';
import Navigation from '../Navigation/Navigation';

const EventWrapper = () => {
  return (
    <GlobalProvider>
      <GlobalStyle />
      <AppStyled bg={bg}>
        <MainLayout>
        <Navigation/>
          <main>
          <EventPackages/>
          </main>
        </MainLayout>
      </AppStyled>
    </GlobalProvider>
  );
};

export default EventWrapper;