import React,{useEffect} from "react"
import styled from "styled-components"
import { InnerLayout } from "../../../css/Pulasthi/Layouts";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import InventoryItems from "./InventoryItems";
import InvItemForm from "../Form/InvItemForm";

function Inventory() {

  const {items,getInvItems} = useGlobalContext();

  useEffect(() =>{
    getInvItems()
  },[])
  return (
    <InventoryStyled>
      <InnerLayout>
        <h1>Inventory Items</h1>

        <div className="inv-content">

        <div className="form-container">
            <InvItemForm/>
        </div>
            
            <div className="items">
                {items.map((item) => (
                    
                    // one functional component access another component
                    <InventoryItems
                        key={item._id}
                        itemId={item.itemId}
                        quantity={item.quantity}
                        date={item.date}
                        itemType={item.itemType}
                        itemPrice={item.itemPrice}
                        indicatorColor="var(--color-DarkYellow)"
                        
                    />
                ))}
            </div>
        </div>
      </InnerLayout>
    </InventoryStyled>
  )
};

const InventoryStyled = styled.div`
  display: flex;
  overflow: auto;
    h1{
        margin-bottom:2rem;
        color: #222260;
        font-weight:bold
    }

    .inv-content{
        display: flex;
        gap: 2rem;
        .items{
            flex:1;
        }
    }

    .form-container {
      min-width: 550px; 
      min-height: 400px; 
    }
`;


export default Inventory
