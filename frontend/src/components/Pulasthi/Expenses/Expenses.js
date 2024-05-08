import React, { useEffect } from "react"
import styled from "styled-components"
import { InnerLayout } from "../../../css/Pulasthi/Layouts";
import ExpenseItem from "./ExpenseItem";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import { dollar } from "../../../utils/Pulasthi/Icons";

function Expenses() {

  const {expenses,getExpenses,totalExpense} = useGlobalContext();

  useEffect(() =>{
    getExpenses()
  },[])
  return (
    <InnerLayout>
    <ExpensesStyled>
      <h1>Expenses</h1>

      <h2 className="total-expense">Total Expense:<span>{dollar}.{totalExpense()}</span></h2>

      <div className="income-content">
          
          <div className="incomes">
              {expenses.map((expense) => (
                  
                  // one functional component access another component
                  <ExpenseItem
                      key={expense._id}
                      expenseId={expense.expenseId}
                      amount={expense.amount}
                      date={expense.date}
                      category={expense.category}
                      indicatorColor="var(--color-DarkYellow)"
                      
                  />
              ))}
          </div>
      </div>
    </ExpensesStyled>
    </InnerLayout>
  )
};

const ExpensesStyled = styled.div`
  h1 {
        color: #222260;
        font-weight:bold
      }
  .total-expense{
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FCF6F9;
      border: 2px solid #FFFFFF;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 1rem;
      margin: 1rem 0;
      font-size: 2rem;
      gap: .5rem;
      span{
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--color-lightRed);
      }
  }
    
`;


export default Expenses





