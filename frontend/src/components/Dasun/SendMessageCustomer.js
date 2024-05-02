import React,{useState} from "react";
import axios from "axios";
// import {userNavigate} from 'react-router-dom';
import '../../css/Dasun/addMessage.css';

export default function SendMessage() {

    const [customerId, setCustomerId] = useState("");
    const [messageId, setMessageId] = useState("");
    const [message, setMessage] = useState("");

    // const navigate = userNavigate();


    function sendData(e){

        e.preventDefault();
        
        const date = new Date().toISOString().split('T')[0];

        const newMessageCustomer = {

            customerId,
            messageId,
            message,
            date

        }

        axios.post("http://localhost:8070/CustomerMessages/add", newMessageCustomer).then(() => {

            alert("Message Sent");

            setCustomerId("");
            setMessageId("");
            setMessage("");

            // navigate("/faq/all");

        }).catch((err) => {

            alert(err);

        })

    }


    return(

        <div id="send_message_page" >
            <form id="send_message_page_form" onSubmit={sendData}>


                {/* <div class="form-group">

                    <label for="customerId">Customer ID</label>
                    <input type="text" class="form-control" id="customerId" placeholder="Enter Customer ID" 
                    onChange={(e) => {
                        setCustomerId(e.target.value);
                    }} />
                    

                </div>

                <br /> */}


                {/* <div class="form-group">

                    <label for="messageId">Message ID</label>
                    <input type="text" class="form-control" id="messageId" placeholder="Enter Message ID" 
                    onChange={(e) => {
                        setMessageId(e.target.value);
                    }} />
                    

                </div> */}

                <br />



                <div class="form-group">

                    <label id="send_message_page_form_label_message" for="message">Massage</label> <br />
                    <input type="text" class="form-control" id="send_message_page_form_input_message" placeholder="Enter Message" 
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }} />
                    

                </div>

                <br />


                <br />

                <button id="send_message_page_form_submitBtn" type="submit" class="btn btn-primary">Send</button>

            </form>
        </div>

    )

}