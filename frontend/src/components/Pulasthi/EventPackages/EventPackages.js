import React, { useEffect } from "react"
import styled from "styled-components"
import { InnerLayout } from "../../../css/Pulasthi/Layouts"
import EventItems from "./EventItems";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import EventForm from "../Form/EventForm";

function EventPackages() {

  const {events,getEventDetails} = useGlobalContext();

  useEffect(() =>{
    getEventDetails()
  },[])

  return (
    <InnerLayout>
    <EventPackagesStyled>
      <h1>Event packages</h1>

        <div className="inv-content">

        <div className="form-container">
            <EventForm/>
        </div>
            
            <div className="items">
                {events.map((event) => (
                    
                    // one functional component access another component
                    <EventItems
                        key={event._id}
                        objectId={event._id}
                        // itemId={item.itemId}
                        packageType={event.pName} //backend eken response eka enne menna me nam walin(ex:pName.pPrice)
                        date={event.date}
                        packagePrice={event.pPrice}
                        indicatorColor="var(--color-DarkYellow)"
                        
                    />
                ))}
            </div>
        </div>
    </EventPackagesStyled>
    </InnerLayout>
  )
};

const EventPackagesStyled = styled.div`
  
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


export default EventPackages





