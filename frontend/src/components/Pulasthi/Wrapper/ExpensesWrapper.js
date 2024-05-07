import React from "react"
import { ExpenseProvider, GlobalProvider } from "../../../context/Pulasthi/globalContext"
import { GlobalStyle } from "../../../css/Pulasthi/GlobalStyle"
import Expenses from "../Expenses/Expenses"

import bg from '../../../images/Pulasthi/hello.png'
import { AppStyled } from '../../../css/Pulasthi/AppStyled';
import { MainLayout } from '../../../css/Pulasthi/Layouts';
import Navigation from '../Navigation/Navigation';


const ExpenseWrapper = () =>{
    return(
        <GlobalProvider>
            <GlobalStyle/>
            <AppStyled bg={bg}>
              <MainLayout>
               <Navigation/>
                <main>
                    <Expenses/>
                </main>
              </MainLayout>
            </AppStyled>
        </GlobalProvider>
    )
}


export default ExpenseWrapper;