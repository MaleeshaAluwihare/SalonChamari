import React from "react"
import styled from "styled-components"
import { calender, close, dollar, update } from "../../../utils/Pulasthi/Icons"
import { dateFormat } from "../../../utils/Pulasthi/dateFormat";
import Button from "../Button/Button";

// Inside your SearchBudgetItem component
function SearchBudgetItem({budget,onClose1}) {
    return (
      <SearchBudgetItemStyled>
        {budget && (
          <div className="content">
            <h5>{budget.month}</h5>
            <div className="inner-content">
            
              <div className="text">
                <p>{dollar} {budget.amount}</p>
                <p>{calender} {dateFormat(budget.date)}</p>
                <p>{budget.budgetId}</p>
              </div>
              <div className="btn-con">
                  {/* <button onClick={onClose}>Close</button> */}
                  <Button
                        name={`Close`}
                        icon={close}
                        bPad={'1rem'}
                        bRad={'10%'}
                        bg={'var(--color-lightRed'}
                        color={'#fff'}
                        iColor={'#fff'}
                        hColor={'var(--color-green)'}
                        onClick={onClose1} //update starts from here
                    />
              </div>
            </div>
          </div>   
        )}     
      </SearchBudgetItemStyled>
    );
  }
  

const SearchBudgetItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: .8rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    
    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            font-weight: bold;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    } 
`
export default SearchBudgetItem
