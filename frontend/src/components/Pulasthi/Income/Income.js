import React from "react"
import styled from "styled-components"
import { InnerLayout } from "../../../css/Pulasthi/Layouts";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";

function Income() {

  const {addIncome} = useGlobalContext();

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Income</h1>
      </InnerLayout>
    </IncomeStyled>
  )
};

const IncomeStyled = styled.div`

`;


export default Income





