import React, {useState, useEffect} from "react";
import '../../CSS/allFaq.css';

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
                        <tr key={faqs._id}>
                            <td>{faqs.question}</td>
                            <td>{faqs.answer}</td>
                            <td><button className="UpdateBtn">Update</button></td>
                            <td><button className="DeleteBtn">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    )

}

