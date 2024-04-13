import React, { useContext, useState } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:8070/finance/";

const GlobalContext = React.createContext()

//children gonna be the whole app
export const GlobalProvider = ({children}) => {

    //state is used to store the array
    const [budgets, setBudgets] = useState([])
    const [budget,setBudget] = useState(null);
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
    //update budget
    // const updateBudget = async () =>{
    //     const res = await axios.put(`${BASE_URL}update-budget/${id}`, budgets)
    //     .catch((err)=>{
    //         setError(err.res.data.message)
    //     })
    //     getBudgets()
    // }

    //getOneBudgetData
    const getOneBudget = async (id) => {
        const response = await axios.get(`${BASE_URL}getBudgetById/${id}`)//error ekk print karanawanm methona then catch ekk danna onne
        setBudget(response.data.budget);//.budget is must here
        console.log(response.data)
    }

    return(
        <GlobalContext.Provider value={{
            addBudget,
            getBudgets,
            budgets,
            deleteBudget,
            // updateBudget,
            getOneBudget,
            budget,
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