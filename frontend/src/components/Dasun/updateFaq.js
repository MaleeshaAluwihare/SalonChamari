import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateFaq() {

    const {id} = useParams();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    useEffect(() => {

        const fetchFaq = async() => {

            try{

                const response = await axios.get("http://localhost:8070/Faqs/get/${id}");
                const {question, answer} = response.data;

                setQuestion(question);
                setAnswer(answer);

            } catch(error){

                console.error("Error with fetching faq : ", error);

            }

        }
        fetchFaq();

    }, [id]);

    const handleQuestionChange = (e) => {

        setQuestion(e.target.value);

    };

    const handleAnswerChange = (e) => {

        setAnswer(e.target.value);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try{

            await axios.put("http://localhost:8070/Faqs/update/${id}", {question, answer});
            alert("Faq updated");

        } catch(error) {

            alert("Error in updating faq");
            console.log(error);

        }

    }


    return (

        <div>
            <form onSubmit={handleSubmit}>

                <div class="form-group">

                    <label for="question">Question</label>
                    <input type="text" class="form-control" id="question" value={question} onChange={handleQuestionChange} />
                    

                </div>

                <br />


                <div class="form-group">

                    <label for="answer">Answer</label>
                    <input type="text" class="form-control" id="answer" value={answer} onChange={handleAnswerChange}/>
                    

                </div>

                <br />

                <button type="submit" class="btn btn-primary">Update</button>

            </form>
        </div>

    )

}