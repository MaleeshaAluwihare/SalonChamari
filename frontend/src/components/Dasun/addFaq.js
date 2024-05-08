import React,{useState} from "react";
import axios from "axios";
import Styles from '../../css/Dasun/addFaqForm.module.css'
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

        <div className={Styles.add_Faq_page}>
            <form className={Styles.add_Faq_page_form} onSubmit={sendData}>


                {/* <div class="form-group">

                    <label for="faqId">Faq ID</label>
                    <input type="text" class="form-control" id="faqId" placeholder="Enter ID" 
                    onChange={(e) => {
                        setFaqId(e.target.value);
                    }} />
                    

                </div> */}

                <br />


                <div className={Styles.form_group}>

                    <label className={Styles.add_Faq_page_form_label_question} for="question">Question</label>
                    <input type="text" class="form-control" className={Styles.add_Faq_page_form_input_question} placeholder="Enter Question" 
                    onChange={(e) => {
                        setQuestion(e.target.value);
                    }} />
                    

                </div>

                <br />


                <div className={Styles.form_group}>

                    <label className={Styles.add_Faq_page_form_label_answer} for="answer">Answer</label>
                    <input type="text" class="form-control" className={Styles.add_Faq_page_form_input_answer} placeholder="Enter Answer" 
                    onChange={(e) => {
                        setAnswer(e.target.value);
                    }} />
                    

                </div>

                <br />

                <button className={Styles.add_Faq_page_form_submitBtn} type="submit" class="btn btn-primary">Submit</button>

            </form>
        </div>

    )

}