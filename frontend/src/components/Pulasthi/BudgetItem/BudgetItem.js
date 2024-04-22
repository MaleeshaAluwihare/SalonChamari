import React from "react"
import styled from "styled-components"
import { calender, dollar, trash, update } from "../../../utils/Pulasthi/Icons";
import Button from "../Button/Button";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
//this component is used to display items
function BudgetItem({
    //me props enne Budget component eken
    //me id eka mkkd kiyala hoya ganna
    budgetId,
    month,
    amount,
    date,
    deleteItem,
    updateItem,
    indicatorColor,
    onShowUpdateForm,
}) {
    const { getOneBudget } = useGlobalContext();

    const handleUpdateClick = () => {
        onShowUpdateForm(); // Call parent function to show UpdateForm
        getOneBudget(budgetId);
    };

  return (
    <BudgetItemStyled indicator={indicatorColor}>
        
      {/* <div className="icon">

      </div> */}
      <div className="content">
            <h5>{month}</h5>
            <div className="inner-content">
                <div className="text">
                    <p>{dollar} {amount}</p>
                    <p>{calender} {date}</p>
                    <p>
                        {budgetId}
                    </p>
                </div>
                <div className="btn-con">
                    <Button
                        icon={trash}
                        bPad={'1rem'}
                        bRad={'50%'}
                        bg={'var(--primary-color'}
                        color={'#fff'}
                        iColor={'#fff'}
                        hColor={'var(--color-green)'}
                        onClick={() => deleteItem(budgetId)}
                    />
                    <Button
                        icon={update}
                        bPad={'1rem'}
                        bRad={'50%'}
                        bg={'var(--primary-color'}
                        color={'#fff'}
                        iColor={'#fff'}
                        hColor={'var(--color-green)'}
                        onClick={handleUpdateClick}
                    />
                </div>
            </div>
      </div>        
    </BudgetItemStyled>
  )
};

const BudgetItemStyled = styled.div`
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
    /* .icon{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
        }
    } */
    .btn-con{
        display:flex;
        flex-direction:column-reverse;
        gap: .8rem;
    }
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
`;
export default BudgetItem
