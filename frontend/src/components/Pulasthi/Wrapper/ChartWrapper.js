import React from 'react';
import { GlobalProvider } from '../../../context/Pulasthi/globalContext';  
import { GlobalStyle } from '../../../css/Pulasthi/GlobalStyle';  
import Chart from '../Chart/Chart';



const ChartWrapper = () => {
  return (
    <GlobalProvider>
      <GlobalStyle />
      <Chart/>
    </GlobalProvider>
  );
};

export default ChartWrapper;