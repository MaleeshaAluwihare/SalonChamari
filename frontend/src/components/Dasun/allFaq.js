import React, {useState, useEffect} from "react";

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

            <table>
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                    </tr>
                </thead>

                <tbody>
                    {faqs.map(faqs => (
                        <tr key={faqs._id}>
                            <td>{faqs.question}</td>
                            <td>{faqs.answer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    )

}

