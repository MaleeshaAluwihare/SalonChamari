import React,{useEffect} from "react"
import styled from "styled-components"
import { InnerLayout } from "../../../css/Pulasthi/Layouts";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import IncomeItem from "./IncomeItem";

function Income() {

  const {incomes,getIncomes} = useGlobalContext();

  useEffect(() =>{
    getIncomes()
  },[])
  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Income</h1>

        <div className="income-content">
            {/* getbudgets */}
            <div className="budgets">
                {incomes.map((income) => (
                    
                    // one functional component access another component
                    <IncomeItem
                        key={income._id}
                        incomeId={income.incomeId}
                        amount={income.amount}
                        date={income.date}
                        category={income.category}
                        indicatorColor="var(--color-DarkYellow)"
                        // deleteItem={deleteBudget}
                        // updateItem={updateBudget}
                        // onShowUpdateForm={handleShowUpdateForm} // Pass function to show UpdateForm
                    />
                ))}
            </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  )
};

const IncomeStyled = styled.div`

`;


export default Income





