import React,{useState} from "react";
import axios from "axios";
import '../../CSS/Dasun/forms.css';
// import {userNavigate} from 'react-router-dom';

export default function AddFaq() {

    const [faqId, setFaqId] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    // const navigate = userNavigate();


    
    function sendData(e){

        e.preventDefault();
        
        const newFaq = {

            faqId,
            question,
            answer

        }

        axios.post("http://localhost:8070/Faqs/add", newFaq).then(() => {

            alert("Faq added");

            setFaqId("");
            setQuestion("");
            setAnswer("");

            // navigate("/faq/all");

        }).catch((err) => {

            alert(err);

        })

    }

    return(

        <div>
            <form onSubmit={sendData}>


                {/* <div class="form-group">

                    <label for="faqId">Faq ID</label>
                    <input type="text" class="form-control" id="faqId" placeholder="Enter ID" 
                    onChange={(e) => {
                        setFaqId(e.target.value);
                    }} />
                    

                </div> */}

                <br />


                <div class="form-group">

                    <label for="question">Question</label>
                    <input type="text" class="form-control" id="question" placeholder="Enter Question" 
                    onChange={(e) => {
                        setQuestion(e.target.value);
                    }} />
                    

                </div>

                <br />


                <div class="form-group">

                    <label for="answer">Answer</label>
                    <input type="text" class="form-control" id="answer" placeholder="Enter Answer" 
                    onChange={(e) => {
                        setAnswer(e.target.value);
                    }} />
                    

                </div>

                <br />

                <button type="submit" class="btn btn-primary">Submit</button>

            </form>
        </div>

    )

}