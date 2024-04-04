import React, { useEffect } from "react"
import styled from "styled-components"
import { InnerLayout } from "../../../css/Pulasthi/Layouts";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import Form from "../Form/Form";
import BudgetItem from "../BudgetItem/BudgetItem";

function Budget() {

  //here useGlobalContext used to bring globalContext methods
  const {addBudget,getBudgets,budgets} = useGlobalContext();
  //useEffect take backend response array to budget component
  //useEffect use wena pradana thanak tama me budgets okkoma display karana functional component eka
  useEffect(() =>{
    getBudgets()
  },[])
//structure of the get budgets
  return (
    <BudgetStyled>
      <InnerLayout>
        <h1>Budget</h1>
        <div className="budget-content">
          <div className="form-container"></div>
          <div className="budgets">
              <Form/>
          </div>
          <div className="incomes">
              {budgets.map((budget) => {
                  const {_id, budgetId, month, amount, date,} = budget;
                  // one functional component access another component
                  return <BudgetItem
                      key={_id}
                      id={_id} 
                      budgetId={budgetId} 
                      month={month} 
                      amount={amount} 
                      date={date}  
                      indicatorColor="var(--color-green)"
                      // deleteItem={deleteBudget}
                  />
              })}
          </div>
        </div>
      </InnerLayout>
    </BudgetStyled>
  )
};

const BudgetStyled = styled.div`

`;


export default Budget





