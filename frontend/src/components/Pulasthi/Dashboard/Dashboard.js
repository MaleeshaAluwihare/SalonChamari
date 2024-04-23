import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { InnerLayout } from "../../../css/Pulasthi/Layouts";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import { dollar, download } from "../../../utils/Pulasthi/Icons";
import {useReactToPrint} from  "react-to-print"
import Button from "../Button/Button";

function Dashboard() {

  const {totalExpense, totalIncome, totalProfit, getIncomes,getExpenses} = useGlobalContext()

  //whenever we refresh the dashboard below methods get called
  useEffect(() => {
    getIncomes()
    getExpenses()
  }, [])
  //pdf generator
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content:() => ComponentsRef.current,
    documentTitle:"Finance Manager Report",
    onAfterPrint:()=>alert("Report Successfully Download")
  })

  return (
    <InnerLayout>
    <DashboardStyled>
      <h1>Dashboard</h1>
        <div className="amount-con" ref={ComponentsRef}>
          <div className="income">
              <h2>Total Income</h2>
              <p>
                  {dollar} {totalIncome()}
              </p>
          </div>
          <div className="expense">
              <h2>Total Expense</h2>
              <p>
                  {dollar} {totalExpense()}
              </p>
          </div>
          <div className="balance">
              <h2>Net Profit</h2>
              <p>
                  {dollar} {totalProfit()}
              </p>
          </div>
       </div>
       <Button
            name={'Download'}
            icon={download}
            bPad={'.8rem 1.6rem'}
            bRad={'30px'}
            bg={'var(--color-lightYellow'}
            color={'#fff'}
            onClick={handlePrint}
        />

    </DashboardStyled>
    </InnerLayout>
  )
};

const DashboardStyled = styled.div`

`;


export default Dashboard





