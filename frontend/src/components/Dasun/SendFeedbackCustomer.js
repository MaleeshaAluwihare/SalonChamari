import React,{useState} from "react";
import axios from "axios";
// import {userNavigate} from 'react-router-dom';

export default function SendFeedback() {

    const [feedbackId, setFeedbackId] = useState("");
    const [bookingId, setBookingId] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    // const navigate = userNavigate();


    function sendData(e){

        e.preventDefault();
        
        const sendDate = new Date().toISOString().split('T')[0];

        const newFeedbackCustomer = {

            feedbackId,
            bookingId,
            category,
            content,
            sendDate

        }

        axios.post("http://localhost:8070/Feedbacks/add", newFeedbackCustomer).then(() => {

            alert("Feedback added");

            setFeedbackId("");
            setBookingId("");
            setCategory("");
            setContent("");

            // navigate("/faq/all");

        }).catch((err) => {

            alert(err);

        })

    }


    return(

        <div>
            <form onSubmit={sendData}>


                <div class="form-group">

                    <label for="feedbackId">Feedback ID</label>
                    <input type="text" class="form-control" id="feedbackId" placeholder="Enter Feedback ID" 
                    onChange={(e) => {
                        setFeedbackId(e.target.value);
                    }} />
                    

                </div>

                <br />


                <div class="form-group">

                    <label for="bookingId">Booking ID</label>
                    <input type="text" class="form-control" id="bookingId" placeholder="Enter Booking ID" 
                    onChange={(e) => {
                        setBookingId(e.target.value);
                    }} />
                    

                </div>

                <br />


                <div className="form-group">

                    <label htmlFor="category">

                        Category

                        <select 
                        
                        value= {category}

                        onChange={(e) => {

                            setCategory(e.target.value)

                        }}
                        required
                        className="form-control"

                        >

                            <option value="Salon"> Salon </option>
                            <option value="Photography"> Photography </option>
                            <option value="Events"> Event </option>

                        </select>

                    </label>

                </div>



                <div class="form-group">

                    <label for="content">Content</label>
                    <input type="text" class="form-control" id="content" placeholder="Enter Feedback" 
                    onChange={(e) => {
                        setContent(e.target.value);
                    }} />
                    

                </div>

                <br />


                <br />

                <button type="submit" class="btn btn-primary">Submit</button>

            </form>
        </div>

    )

}