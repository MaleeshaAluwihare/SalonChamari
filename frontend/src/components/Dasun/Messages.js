import React, {useState, useEffect} from "react";
import '../../CSS/Dasun/allFaq.css';
import { Link } from "react-router-dom";

export default function Messages() {

    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [searchCustomerId, setSearchCustomerId] = useState("");

    useEffect(() => {

        const allmessages = async () => {

            try{

                const response = await fetch('http://localhost:8070/CustomerMessages/display');
                const data = await response.json();

                setMessages(data);

                setFilteredMessages(data);

            } catch(error) {

                console.error('Error with fetching messages : ', error);

            }

        }
        allmessages();

    }, []);


    const formatDate = (dateString) => {

        const date = new Date(dateString);
        
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}`: day;
        const formattedMonth = month < 10 ? `0${month}`: month;

        return `${formattedDay}/${formattedMonth}/${year}`;

    };


    const handleSearch = () => {

        const filtered = messages.filter((message) => message.customerId ===searchCustomerId);
        setFilteredMessages(filtered);

    };


    const handleInputChange = (e) => {

        setSearchCustomerId(e.target.value);

    }


    return(

        <div>

            <h1>All Messages</h1>

            <div>

                <label htmlFor="customerId">Search by Customer ID: </label>

                <input 
                    type="text"
                    id="customerId"
                    value={searchCustomerId}
                    onChange={handleInputChange}
                    placeholder="Enter Customer ID"
                />

                <button onClick={handleSearch}>Search</button>

            </div>

            <br />

            <table className="FaqTable">
                <thead className="theader">
                    <tr>
                        <th>Customer ID</th>
                        <th>Message ID</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody className="tbody">
                    {filteredMessages.map(messages => (
                        <tr key={messages._id}>
                            <td>{messages.customerId}</td>
                            <td>{messages.messageId}</td>
                            <td>{messages.message}</td>
                            <td>{formatDate(messages.date)}</td>
                            <td><Link to={`/ReplyMessage/add/${messages.messageId}`}><button className="UpdateBtn">Reply</button></Link>
                            <Link to={`/CustomerMessages/delete/${messages.messageId}`}><button className="DeleteBtn">Delete</button></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    )

}