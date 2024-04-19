import React, {useState, useEffect} from "react";
import '../CSS/allFaq.css';
import { Link } from "react-router-dom";

export default function CustomerFaq() {

    const [faqs, setFaqs] = useState([]);

    useEffect(() => {

        const allFaqs = async () => {

            try{

                const response = await fetch('http://localhost:8070/Faqs/display');
                const data = await response.json();

                setFaqs(data);

            } catch(error) {

                console.error('Error with fetching faqs : ', error);

            }

        }
        allFaqs();

    }, [])

    return(

        <div>

            <h1>All Faqs</h1>

            <table className="FaqTable">
                <thead className="theader">
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                    </tr>
                </thead>

                <tbody className="tbody">
                    {faqs.map(faqs => (
                        <tr key={faqs._faqId}>
                            <td>{faqs.question}</td>
                            <td>{faqs.answer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    )

}
