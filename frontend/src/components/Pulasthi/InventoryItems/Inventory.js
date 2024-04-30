import React,{useEffect} from "react"
import styled from "styled-components"
import { InnerLayout } from "../../../css/Pulasthi/Layouts";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import InventoryItems from "./InventoryItems";

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
            
            <div className="items">
                {items.map((item) => (
                    
                    // one functional component access another component
                    <InventoryItems
                        key={item._id}
                        itemId={item.itemId}
                        quantity={item.quantity}
                        date={item.date}
                        itemType={item.itemType}
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
   
    h1{
        margin-bottom:2rem;
    }
`;


export default Inventory
