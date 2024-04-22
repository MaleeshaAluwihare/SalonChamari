import React, {useState, useEffect} from "react";
import '../../CSS/Dasun/allFaq.css';
import { Link } from "react-router-dom";

export default function Feedbacks() {

    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedRating, setSelectedRating] = useState("All");

    useEffect(() => {

        const allfeedbacks = async () => {

            try{

                const response = await fetch('http://localhost:8070/Feedback/display');
                const data = await response.json();

                setFeedbacks(data);

                setFilteredFeedbacks(data); //Initialize filtered feedbacks with all feedbacks

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


    
    

    const handleCategoryFilter = (category) => {

        setSelectedCategory(category);
        filterFeedbacks(category, selectedRating);

    }


    const handleRatingFilter = (rating) => {

        setSelectedRating(rating);
        filterFeedbacks(selectedCategory, rating);

    }


    const filterFeedbacks = (category, rating) => {

        let filtered = feedbacks;

        if (category !== "All") {

            filtered = filtered.filter((item) => item.category === category);

        }

        if (rating !== "All") {

            filtered = filtered.filter((item) => item.rating === parseInt(rating));

        }

        setFilteredFeedbacks(filtered);

    }


    return(

        <div>

            <h1>All Feedbacks</h1>

            <div>

                <label htmlFor="categoryFilter">Filter by Category</label>

                <select 
                    id= "categoryFilter"
                    value={selectedCategory}
                    onChange={(e) => handleCategoryFilter(e.target.value)}
                >

                    <option value="All">All</option>
                    <option value="Salon">Salon</option>
                    <option value="Photography">Photography</option>
                    <option value="Events">Events</option>

                </select>


            </div>


            <div>

                <label htmlFor="ratingFilter">Filter by Rating</label>

                <select 
                    id= "ratingFilter"
                    value={selectedRating}
                    onChange={(e) => handleRatingFilter(e.target.value)}
                >

                    <option value="All">All</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>




                </select>


            </div>


            <br />

            <table className="FaqTable">
                <thead className="theader">
                    <tr>
                        <th>Feedback ID</th>
                        <th>Booking ID</th>
                        <th>Category</th>
                        <th>Feedback</th>
                        <th>Rating</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                

                <tbody className="tbody">
                    {filteredFeedbacks.map(feedbacks => (
                        <tr key={feedbacks._id}>
                            <td>{feedbacks.feedbackId}</td>
                            <td>{feedbacks.bookingId}</td>
                            <td>{feedbacks.category}</td>
                            <td>{feedbacks.content}</td>
                            <td>{feedbacks.rating}</td>
                            <td>{formatDate(feedbacks.sendDate)}</td>
                            <td><Link to={"#"}><button className="UpdateBtn">Reply</button></Link>
                            <Link to={`/feedback/delete/${feedbacks.feedbackId}`}><button className="DeleteBtn">Delete</button></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    )

}