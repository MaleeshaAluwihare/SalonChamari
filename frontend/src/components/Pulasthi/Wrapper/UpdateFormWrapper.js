import React from 'react';
import { GlobalProvider } from '../../../context/Pulasthi/globalContext';  
import { GlobalStyle } from '../../../css/Pulasthi/GlobalStyle';  
import UpdateForm from '../Form/UpdateForm';


const UpdateFormWrapper = () => {
  return (
    <GlobalProvider>
      <GlobalStyle />
      <UpdateForm/>
    </GlobalProvider>
  );
};

export default UpdateFormWrapper;