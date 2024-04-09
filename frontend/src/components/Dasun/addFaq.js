import React,{useState} from "react";
import axios from "axios";

export default function AddFaq() {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");


    function sendData(e){

        e.preventDefault();
        
        const newFaq = {

            question,
            answer

        }

        axios.post("http://localhost:8070/Faqs/add", newFaq).then(() => {

            alert("Faq added");

            setQuestion("");
            setAnswer("");

        }).catch((err) => {

            alert(err);

        })

    }

    return(

        <div>
            <form onSubmit={sendData}>

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