import React, {useState, useEffect} from "react";
import '../CSS/Dasun/allFaq.css';
import '../CSS/Dasun/customerFaq.css';
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

        <div id="Faq_customer_page" >

            <h1 id="Faq_customer_page_heading" >FAQ</h1>

            <table id="Faq_customer_page_table" className="FaqTable">
                <thead id="Faq_customer_page_table_heading" className="theader">
                    <tr id="Faq_customer_page_table_hr" >
                        <th>Question</th>
                        <th>Answer</th>
                    </tr>
                </thead>

                <tbody id="Faq_customer_page_table_body" className="tbody">
                    {faqs.map(faqs => (
                        <tr id="Faq_customer_page_table_br" key={faqs._faqId}>
                            <td>{faqs.question}</td>
                            <td>{faqs.answer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    )

}
