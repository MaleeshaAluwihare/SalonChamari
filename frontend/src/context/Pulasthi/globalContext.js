import React, { useContext, useState } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:8070/finance/";

const GlobalContext = React.createContext()

//children gonna be the whole app
export const GlobalProvider = ({children}) => {

    const [budgets, setBudgets] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    const addBudget = async (budget) => {
                                                                //budget(newBudget) kiyanna object eka enne addBudget form walin
        const response = await axios.post(`${BASE_URL}add-budget`, budget)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        // getIncomes()
    }

    return(
        <GlobalContext.Provider value={{
            addBudget
        }}>
            {children}
        </GlobalContext.Provider>
    )

}

//uda return karala tyenna GlobalContext eka app.js eken access karanna onne nisa apita onne eliyen function ekk
//eka tma me
export const useGlobalContext = () =>{
    //createContext eken create karapu ape context eka parameter ekk widihata pass karanwa eka use karanna
    return useContext(GlobalContext)
}