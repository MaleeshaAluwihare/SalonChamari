import React from "react"
import styled from "styled-components"
import { calender, dollar, list } from "../../../utils/Pulasthi/Icons";
import { dateFormat } from "../../../utils/Pulasthi/dateFormat";

function EventItems({
      key,
      objectId,
      packageType,
      date,
      packagePrice,
      indicatorColor
}) {

  return (
    <EventItemsStyled indicator={indicatorColor}>

      <div className="content">
            <h5>{objectId}</h5>
            <div className="inner-content">
                <div className="text">
                    <p>{list} {packageType}</p>
                    <p>{calender} {dateFormat(date)}</p>
                    
                    <p>{dollar}{packagePrice}</p>
                </div>
                
            </div>
      </div>  
    </EventItemsStyled>
  )
};

const EventItemsStyled = styled.div`
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
        align-items: center;
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


export default EventItems





