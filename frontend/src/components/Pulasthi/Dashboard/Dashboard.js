import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../../css/Pulasthi/Layouts";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import { dollar, download } from "../../../utils/Pulasthi/Icons";
import Button from "../Button/Button";
import Chart from "../Chart/Chart";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Dashboard() {
  const { totalExpense, totalIncome, totalProfit, getIncomes, getExpenses } =
    useGlobalContext();

  //whenever we refresh the dashboard below methods get called
  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);


  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Add content to the PDF
    doc.text("Finance Manager Report", 105, 10, { align: "center" });
  
    // Generate chart as an image (base64)
    const chartImage = document.querySelector(".chart-con canvas").toDataURL("image/png");
  
    // Add chart image to PDF
    doc.addImage(chartImage, "PNG", 10, 20, 180, 100); // Adjust position and dimensions as needed
  
    // Add financial data table to PDF
    doc.autoTable({
      head: [["Category", "Amount"]],
      body: [
        ["Revenue", totalIncome()],
        ["Total Expense", totalExpense()],
        ["Monthly Net Profit", totalProfit()],
      ],
      startY: 130, // Adjust position below the chart
    });
  
    // Save the PDF
    doc.save("FinanceManagerReport.pdf");
  };

  return (
    <InnerLayout>
      <DashboardStyled>
        <h1>Dashboard</h1>
        <div className="stats-con">
          <div className="chart-con">
            
              <Chart />
            
            <div className="amount-con">
              <div className="income">
                <h2>Revenue</h2>
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
                <h2>Monthly Net Profit</h2>
                <p>
                  {dollar} {totalProfit()}
                </p>
              </div>
            </div>
            <div className="btn-con">
              <Button
                name={"Download Report"}
                icon={download}
                bPad={".8rem 1.6rem"}
                bRad={"30px"}
                bg={"var(--color-lightYellow)"}
                color={"#fff"}
                onClick={() => {
                  generatePDF();
                  // handlePrint();
                }}
              />
            </div>
          </div>
        </div>
      </DashboardStyled>
    </InnerLayout>
  );
}

const DashboardStyled = styled.div`
   h1 {
        color: #222260;
        font-weight:bold
      }
  .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 5;
            height: 400px;
            margin-left:200px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    grid-column: span 2;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 1px solid #FFFFFF;
                    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.06);
                    border-radius: 10px;
                    padding: 1rem;
                    p{
                        font-size: 2.5rem;
                        font-weight: 500;
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 2.5rem;
                    }
                }
            }
            
            .btn-con{
              display: flex;
              justify-content: center; /* Center horizontally */
              align-items: center; /* Center vertically if needed */
              /* this padding is applied inside the .btn-con container itself */
              padding: 2rem 0; /* Adds some padding around the button */
            }
           
        }
   }

`;

export default Dashboard;
