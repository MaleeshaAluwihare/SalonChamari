import React, { useContext, useState } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:8070/finance/";

const GlobalContext = React.createContext()

//children gonna be the whole app
export const GlobalProvider = ({children}) => {

    //state is used to store the array
    const [budgets, setBudgets] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    //add Budget
    const addBudget = async (budget) => {
                                                                //budget(newBudget) kiyanna object eka enne addBudget form walin
        const response = await axios.post(`${BASE_URL}add-budget`, budget)
            .catch((err) =>{
                setError(err.response.data.message)
            })
            //aluth budget ekk add karaddi e add krpu newbudget eka realtime pennana getBudgets() method eka call krnwa
           getBudgets()
    }
    // get Budget
    const getBudgets = async () => {
        const response = await axios.get(`${BASE_URL}get-budgets`)
        setBudgets(response.data)
        console.log(response.data)
    }
    //delete budget
    const deleteBudget = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-budget/${id}`)
        //budget ekk delete karata passeth backend eke tyenna budgets tika pennana getBudgets() method eka call karanawa
        getBudgets()
    }

    return(
        <GlobalContext.Provider value={{
            addBudget,
            getBudgets,
            budgets,
            deleteBudget,
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