import React from "react"
import { ExpenseProvider, GlobalProvider } from "../../../context/Pulasthi/globalContext"
import { GlobalStyle } from "../../../css/Pulasthi/GlobalStyle"
import Expenses from "../Expenses/Expenses"



const ExpenseWrapper = () =>{
    return(
        <GlobalProvider>
            <GlobalStyle/>
            <Expenses/>
        </GlobalProvider>
    )
}


export default ExpenseWrapper;