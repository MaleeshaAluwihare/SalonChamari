import React, {useState, useEffect} from "react";
import '../../CSS/Dasun/allFaq.css';
import { Link } from "react-router-dom";

export default function Feedbacks() {

    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {

        const allfeedbacks = async () => {

            try{

                const response = await fetch('http://localhost:8070/Feedback/display');
                const data = await response.json();

                setFeedbacks(data);

            } catch(error) {

                console.error('Error with fetching feedbacks : ', error);

            }

        }
        allfeedbacks();

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


    return(

        <div>

            <h1>All Feedbacks</h1>

            <table className="FaqTable">
                <thead className="theader">
                    <tr>
                        <th>Feedback ID</th>
                        <th>Booking ID</th>
                        <th>Category</th>
                        <th>Feedback</th>
                        <th>Rating</th>
                        <th>Date</th>
                    </tr>
                </thead>
                

                <tbody className="tbody">
                    {feedbacks.map(feedbacks => (
                        <tr key={feedbacks._id}>
                            <td>{feedbacks.feedbackId}</td>
                            <td>{feedbacks.bookingId}</td>
                            <td>{feedbacks.category}</td>
                            <td>{feedbacks.content}</td>
                            <td>{feedbacks.rating}</td>
                            <td>{formatDate(feedbacks.sendDate)}</td>
                            <td><Link to={"#"}><button className="UpdateBtn">Reply</button></Link></td>
                            <td><Link to={`/feedback/delete/${feedbacks.feedbackId}`}><button className="DeleteBtn">Delete</button></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    )

}