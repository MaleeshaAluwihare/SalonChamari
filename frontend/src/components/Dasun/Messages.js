import React, {useState, useEffect} from "react";
import Styles from '../../css/Dasun/allMessages.module.css';
import { Link } from "react-router-dom";

export default function Messages() {

    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [searchCustomerId, setSearchCustomerId] = useState("");
    const [searchMessageId, setSearchMessageId] = useState("");
    const [searchDate, setSearchDate] = useState("");

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


    const handleSearchByMessageId = () => {

        const filtered = messages.filter((message) => message.messageId === searchMessageId);
        setFilteredMessages(filtered);

    }

    const handleInputChangeMessage = (e) => {

        setSearchMessageId(e.target.value);

    }


    const handleSearchByDate = () => {

        const filtered = messages.filter((message) => message.date === searchDate);
        setFilteredMessages(filtered);

    }

    const handleInputChangeDate = (e) => {

        setSearchDate(e.target.value);

    }


    return(

        <div id="Message_page">

            <h1 id="Message_page_heading" >Customer Messages</h1>

            <div id="Message_page_search" >

                <label id="Message_page_search_label" htmlFor="customerId">Search by Customer ID: </label>

                <input 
                    type="text"
                    id="Message_page_search_customerId"
                    value={searchCustomerId}
                    onChange={handleInputChange}
                    placeholder="Enter Customer ID"
                />

                <button onClick={handleSearch}>Search</button>

            </div>

            <br />


            <div id="Message_page_search" >

                <label id="Message_page_search_label" htmlFor="messageId">Search by Message ID: </label>

                <input 
                    type="text"
                    id="Message_page_search_customerId"
                    value={searchMessageId}
                    onChange={handleInputChangeMessage}
                    placeholder="Enter Message ID"
                />

                <button onClick={handleSearchByMessageId}>Search</button>

            </div>

            <br />


            <div id="Message_page_search" >

                <label id="Message_page_search_label" htmlFor="date">Search by Date: </label>

                <input 
                    type="text"
                    id="Message_page_search_customerId"
                    value={searchDate}
                    onChange={handleInputChangeDate}
                    placeholder="Enter Date"
                />

                <button onClick={handleSearchByDate}>Search</button>

            </div>

            <br />

            <table id="Message_table">
                <thead id="Message_table_heading" className="theader">
                    <tr>
                        <th>Customer ID</th>
                        <th>Message ID</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody id="Message_table_body" className="tbody">
                    {filteredMessages.map(messages => (
                        <tr key={messages._id}>
                            <td>{messages.customerId}</td>
                            <td>{messages.messageId}</td>
                            <td>{messages.message}</td>
                            <td>{formatDate(messages.date)}</td>
                            <td><Link to={`/ReplyMessage/add/${messages.messageId}`}><button className="ReplyBtn">Reply</button></Link>
                            <Link to={`/CustomerMessages/delete/${messages.messageId}`}><button className="DeleteBtn">Delete</button></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    )

}