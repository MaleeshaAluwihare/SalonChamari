import React from "react"
import styled from "styled-components"
import { InnerLayout } from "../../../css/Pulasthi/Layouts";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import Form from "../Form/Form";

function Budget() {

  const {addBudget} = useGlobalContext();

  return (
    <BudgetStyled>
      <InnerLayout>
        <h1>Budget</h1>
        <div className="budget-content">
          <div className="form-container"></div>
          <div className="budgets">
              <Form/>
          </div>
        </div>
      </InnerLayout>
    </BudgetStyled>
  )
};

const BudgetStyled = styled.div`

`;


export default Budget





