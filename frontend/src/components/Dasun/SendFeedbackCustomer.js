import React,{useState} from "react";
import axios from "axios";
// import {userNavigate} from 'react-router-dom';
import '../../css/Dasun/addFeebackForm.css';

export default function SendFeedback() {

    const [feedbackId, setFeedbackId] = useState("");
    const [bookingId, setBookingId] = useState("");
    const [category, setCategory] = useState("Salon");
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

        <div id="add_feedback_page" >
            <form id="add_feedback_page_form" onSubmit={sendData}>


                {/* <div class="form-group">

                    <label for="feedbackId">Feedback ID</label>
                    <input type="text" class="form-control" id="feedbackId" placeholder="Enter Feedback ID" 
                    onChange={(e) => {
                        setFeedbackId(e.target.value);
                    }} />
                    

                </div>

                <br /> */}


                {/* <div class="form-group">

                    <label id="add_feedback_page_form_label_bookingId" for="bookingId">Booking ID</label>
                    <input type="text" class="form-control" id="add_feedback_page_form_input_bookingId" placeholder="Enter Booking ID" 
                    onChange={(e) => {
                        setBookingId(e.target.value);
                    }} />
                    

                </div>

                <br /> */}


                <div className="form-group">

                    <label id="add_feedback_page_form_label_category" htmlFor="category">

                        Category

                        <select 
                        
                        id= "add_feedback_page_category_filter_select"

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

                    <label id="add_feedback_page_form_label_content" for="content">Feedback</label>
                    <input type="text" class="form-control" id="add_feedback_page_form_input_bookingId" placeholder="Enter Feedback" 
                    onChange={(e) => {
                        setContent(e.target.value);
                    }} />
                    

                </div>

                <br />



                <div className="form-group">

                    <label id="add_feedback_page_form_label_rating" htmlFor="rating"> 
                    
                        Rating 
                        
                        <select 

                        id= "add_feedback_page_rating_filter_select"
                        
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

                <button id="add_feedback_page_form_submitBtn" type="submit" class="btn btn-primary">Submit</button>

            </form>
        </div>

    )

}