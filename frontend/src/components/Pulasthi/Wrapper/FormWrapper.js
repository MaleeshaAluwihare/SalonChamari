import React from 'react';
import { GlobalProvider } from '../../../context/Pulasthi/globalContext';  
import { GlobalStyle } from '../../../css/Pulasthi/GlobalStyle';  
import Form from '../Form/Form';



const FormWrapper = () => {
  return (
    <GlobalProvider>
      <GlobalStyle />
      <Form/>
    </GlobalProvider>
  );
};

export default FormWrapper;