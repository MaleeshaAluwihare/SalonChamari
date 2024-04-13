import React from "react"
import styled from "styled-components"
import { calender, dollar } from "../../../utils/Pulasthi/Icons"

// Inside your SearchBudgetItem component
function SearchBudgetItem({budget}) {
    return (
      <SearchBudgetItemStyled>
        {budget && (
          <div className="content">
            <h5>{budget.month}</h5>
            <div className="inner-content">
              <div className="text">
                <p>{dollar} {budget.amount}</p>
                <p>{calender} {budget.date}</p>
                <p>{budget.budgetId}</p>
              </div>
            </div>
          </div>   
        )}     
      </SearchBudgetItemStyled>
    );
  }
  

const SearchBudgetItemStyled = styled.div`

`
export default SearchBudgetItem
