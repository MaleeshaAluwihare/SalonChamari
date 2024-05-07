import React, { useContext, useState } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:8070/finance/";

const GlobalContext = React.createContext()

//children gonna be the whole app
export const GlobalProvider = ({children}) => {

    //budgets state is used to store the array which is coming from backend
    const [budgets, setBudgets] = useState([])
    const [budget,setBudget] = useState(null);
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [incomes, setIncomes] = useState([])
    const [items, setItems] = useState([])
    const [employees, setEmployee] = useState([])
    const [events, setEvent] = useState([])

    //add Budget
    const addBudget = async (budget) => {
                                                                //budget(collected newBudget data) kiyanna object eka enne addBudget form walin
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
    
    // update budget           //* arrow function ekata id eka pass wenna onne
    const updateBudget = async (id, updatedBudget) => {
        try {
            const res = await axios.put(`${BASE_URL}update-budget/${id}`, updatedBudget);
            // Check if the update was successful
            if (res.status === 200) {
                // If successful, update the budgets
                getBudgets();
            } else {
                // Handle other status codes or errors as needed
                setError("Error updating budget.");
            }
        } catch (error) {
            console.error('Error updating budget:', error);
            setError("Error updating budget.");
        }
    };

    //getOneBudgetData
    const getOneBudget = async (id) => {
        //try{
            const response = await axios.get(`${BASE_URL}getBudgetById/${id}`)//error ekk print karanawanm methona then catch ekk danna onne
            if(response.data){
                setBudget(response.data.budget);//.budget is must here
                console.log(response.data)
            }

    };
    // get Income
    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }
    //total income
    const totalIncome = () =>{
        let totalIncome = 0;
        incomes.forEach((income)=>{
            totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }
    // console.log(totalIncome());
    //get expense
    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }
    //total expense
    const totalExpense = () =>{
        let totalExpense = 0;
        expenses.forEach((expense)=>{
            totalExpense = totalExpense + expense.amount
        })
        return totalExpense;
    }
    //profit
    const totalProfit = () => {
        return totalIncome() - totalExpense()
    }

    // get Inventory Items
    const getInvItems = async () => {
        const response = await axios.get(`${BASE_URL}get-invItems`)
        setItems(response.data)
        console.log(response.data)
    }

    //get Employee details
    const getEmployeeDetails = async() =>{
        const response = await axios.get(`${BASE_URL}get-empSalary`)
        setEmployee(response.data)
        console.log(response.data)
    }

    //get EventDetails
    const getEventDetails = async() =>{
        const response = await axios.get(`${BASE_URL}get-eventPackages`)
        setEvent(response.data)
        console.log(response.data)
    }

    return(
        <GlobalContext.Provider value={{
            addBudget,
            getBudgets,
            budgets,
            deleteBudget,
            updateBudget,
            getOneBudget,
            budget,
            getIncomes,
            incomes,
            totalIncome,
            getExpenses,
            expenses,
            totalExpense,
            totalProfit,
            getInvItems,
            items,
            getEmployeeDetails,
            employees,
            getEventDetails,
            events
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