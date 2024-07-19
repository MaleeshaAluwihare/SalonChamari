import React,{useEffect} from "react"
import styled from "styled-components"
import { InnerLayout } from "../../../css/Pulasthi/Layouts";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import IncomeItem from "./IncomeItem";
import { dollar } from "../../../utils/Pulasthi/Icons";

function Income() {

  const {incomes,getIncomes,totalIncome} = useGlobalContext();

  useEffect(() =>{
    getIncomes()
  },[])
  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Income</h1>
                                                          {/* call the totalIncome function */}
        <h2 className="total-income">Total Income:<span>{dollar}.{totalIncome()}</span></h2>

        <div className="income-content">
            
            <div className="incomes">
                {incomes.map((income) => (
                    
                    // one functional component access another component
                    <IncomeItem
                        key={income._id}
                        incomeId={income.incomeId}
                        amount={income.amount}
                        date={income.date}
                        category={income.category}
                        indicatorColor="var(--color-DarkYellow)"
                        
                    />
                ))}
            </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  )
};

const IncomeStyled = styled.div`
   h1 {
        color: #222260;
        font-weight:bold
      }
    .total-income{
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
            color: var(--color-green);
        }
    }
    
`;


export default Income





