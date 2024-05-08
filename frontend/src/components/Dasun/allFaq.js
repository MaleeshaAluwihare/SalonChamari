import React, {useState, useEffect} from "react";
import Styles from '../../css/Dasun/allFaqs.module.css';
import { Link } from "react-router-dom";

export default function AllFaqs() {

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

        <div className={Styles.Faq_page} >

            <h1 className={Styles.Faq_page_heading} >FAQs</h1>

            <table className={Styles.Faq_page_table}>
                <thead className={Styles.Faq_page_table_heading}>
                    <tr>
                        <th>FAQ ID</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody className={Styles.Faq_page_table_body}>
                    {faqs.map(faqs => (
                        <tr key={faqs._faqId}>
                            <td>{faqs.faqId}</td>
                            <td>{faqs.question}</td>
                            <td>{faqs.answer}</td>
                            <td><Link to={`/faq/update/${faqs.faqId}`}><button className={Styles.UpdateBtn}>Update</button></Link>
                            <Link to={`/faq/delete/${faqs.faqId}`}><button className={Styles.DeleteBtn}>Delete</button></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    )

}

