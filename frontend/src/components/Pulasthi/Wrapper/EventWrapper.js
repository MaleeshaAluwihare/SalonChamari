import React from 'react';
import { GlobalProvider } from '../../../context/Pulasthi/globalContext';  
import { GlobalStyle } from '../../../css/Pulasthi/GlobalStyle';  
import EventPackages from '../EventPackages/EventPackages';

const EventWrapper = () => {
  return (
    <GlobalProvider>
      <GlobalStyle />
      <EventPackages/>
    </GlobalProvider>
  );
};

export default EventWrapper;