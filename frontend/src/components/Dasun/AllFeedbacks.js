import React, {useState, useEffect} from "react";
import '../../CSS/allFaq.css';
import { Link } from "react-router-dom";

export default function Feedbacks() {

    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {

        const allfeedbacks = async () => {

            try{

                const response = await fetch('http://localhost:8070/Feedbacks/display');
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
        return date.toLocaleDateString();

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
                            <td>{formatDate(feedbacks.sendDate)}</td>
                            <td><Link to={"#"}><button className="UpdateBtn">Reply</button></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    )

}