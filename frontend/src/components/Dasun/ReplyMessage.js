import React,{useState} from "react";
import axios from "axios";

export default function ReplyMessage() {

    const [replyId, setReplyId] = useState("");
    const [messageId, setMessageId] = useState("");
    const [reply, setReply] = useState("");
    const [date, setDate] = useState("");


    function sendData(e){

        e.preventDefault();
        
        const newReply = {

            replyId,
            messageId,
            reply,
            date

        };

        axios.post("http://localhost:8070/MessageReplies/add", newReply).then(() => {

            alert("Reply added");

            setReplyId("");
            setMessageId("");
            setReply("");
            setDate("");

        }).catch((err) => {

            alert(err);

        })

    }


    return(

        <div>
            <form onSubmit={sendData}>

                <div class="form-group">

                    <label for="replyId">Reply ID</label>
                    <input type="text" class="form-control" id="replyId" placeholder="Enter Reply ID" 
                    onChange={(e) => {
                        setReplyId(e.target.value);
                    }} />
                    

                </div>

                <br />


                <div class="form-group">

                    <label for="messageId">Message ID</label>
                    <input type="text" class="form-control" id="messageId" placeholder="Enter Message ID" 
                    onChange={(e) => {
                        setMessageId(e.target.value);
                    }} />
                    

                </div>

                <br />


                <div class="form-group">

                    <label for="reply">Reply</label>
                    <input type="text" class="form-control" id="reply" placeholder="Enter Reply" 
                    onChange={(e) => {
                        setReply(e.target.value);
                    }} />
                    

                </div>

                <br />


                <div class="form-group">

                    <label htmlFor="date">Date</label>
                    <input type="date" class="form-control" id="date" value={date} placeholder="Enter Date" 
                    onChange={(e) => {
                        setDate(e.target.value);
                    }} />
                    

                </div>

                <br />


                <button type="submit" class="btn btn-primary">Send</button>

            </form>
        </div>

    )

}