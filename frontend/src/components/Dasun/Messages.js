import React, {useState, useEffect} from "react";
import '../../CSS/allFaq.css';
import { Link } from "react-router-dom";

export default function Messages() {

    const [messages, setMessages] = useState([]);

    useEffect(() => {

        const allmessages = async () => {

            try{

                const response = await fetch('http://localhost:8070/CustomerMessages/display');
                const data = await response.json();

                setMessages(data);

            } catch(error) {

                console.error('Error with fetching messages : ', error);

            }

        }
        allmessages();

    }, [])

    return(

        <div>

            <h1>All Messages</h1>

            <table className="FaqTable">
                <thead className="theader">
                    <tr>
                        <th>Customer ID</th>
                        <th>Message ID</th>
                        <th>Message</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody className="tbody">
                    {messages.map(messages => (
                        <tr key={messages._id}>
                            <td>{messages.customerId}</td>
                            <td>{messages.messageId}</td>
                            <td>{messages.message}</td>
                            <td>{messages.date}</td>
                            <td><Link to={"#"}><button className="UpdateBtn">Reply</button></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    )

}