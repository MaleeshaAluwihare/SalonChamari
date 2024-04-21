import React,{useState} from "react";
import axios from "axios";
// import {userNavigate} from 'react-router-dom';

export default function SendFeedback() {

    const [feedbackId, setFeedbackId] = useState("");
    const [bookingId, setBookingId] = useState("");
    const [category, setCategory] = useState(null);
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);

    // const navigate = userNavigate();


    function sendData(e){

        e.preventDefault();
        
        const sendDate = new Date().toISOString().split('T')[0];

        const newFeedbackCustomer = {

            feedbackId,
            bookingId,
            category,
            content,
            rating,
            sendDate

        }

        axios.post("http://localhost:8070/Feedback/add", newFeedbackCustomer).then(() => {

            alert("Feedback added");

            setFeedbackId("");
            setBookingId("");
            setCategory("");
            setContent("");
            setRating(0);

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



                <div className="form-group">

                    <label htmlFor="rating"> 
                    
                        Rating 
                        
                        <select 
                        
                        value= {rating}

                        onChange={(e) => {

                            setRating(e.target.value)

                        }}
                        required
                        className="form-control"

                        >

                            <option value="0"> 0 </option>
                            <option value="1"> 1 </option>
                            <option value="2"> 2 </option>
                            <option value="3"> 3 </option>
                            <option value="4"> 4 </option>
                            <option value="5"> 5 </option>

                        </select>

                        </label>

                    

                </div>


                <br />

                <button type="submit" class="btn btn-primary">Submit</button>

            </form>
        </div>

    )

}