import React, {useState, useEffect} from "react";
import '../../CSS/Dasun/allFaq.css';
import { Link } from "react-router-dom";
import {jsPDF} from "jspdf";
import { Toast } from "bootstrap";

export default function Feedbacks() {

    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedRating, setSelectedRating] = useState("All");
    const [feedbackCounts, setFeedbackCounts] = useState({});
    const [averageRating, setAverageRating] = useState(0);
    const [categoryAverageRatings, setCategoryAverageRatings] = useState({});

    useEffect(() => {

        const allfeedbacks = async () => {

            try{

                const response = await fetch('http://localhost:8070/Feedback/display');
                const data = await response.json();

                setFeedbacks(data);

                setFilteredFeedbacks(data); //Initialize filtered feedbacks with all feedbacks

                //Calculate feedback counts
                const counts = calculateFeedbackCounts(data);
                setFeedbackCounts(counts);

                //Calculate average rating
                calculateAverageRatings(data);
                calculateCategoryAverageRatings(data);

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


    const calculateFeedbackCounts = (data) => {

        const counts = {
            total: data.length,
            Salon: 0,
            Photography: 0,
            Events: 0
        };

        data.forEach((feedback) => {

            if (feedback.category in counts) {

                counts[feedback.category]++;

            }

        });

        return counts;

    }



    //Calculate Average

    const calculateAverageRatings = (data) => {

        const totalFeedbacks = data.length;

        if(totalFeedbacks > 0){

            const totalRatingSum = data.reduce((sum, feedback) => sum + feedback.rating, 0);
            const average = totalRatingSum / totalFeedbacks;

            setAverageRating(average);

        }

    };


    const calculateCategoryAverageRatings = (data) => {

        const cateforyRatingsSum = {};
        const categoryCounts = {};

        data.forEach((feedback) => {

            const {category, rating} = feedback;

            if(!(category in cateforyRatingsSum)) {

                cateforyRatingsSum[category] = 0;
                categoryCounts[category] = 0;

            }

            cateforyRatingsSum[category] += rating;
            categoryCounts[category]++;

        });


        const averageRatings = {};

        for (const category in cateforyRatingsSum) {

            if(categoryCounts[category] > 0) {

                averageRating[category] = cateforyRatingsSum[category] / categoryCounts[category];

            }

        }


        setCategoryAverageRatings(averageRatings);

    };



    // const generatePDFReport = () => {

    //     const doc = new jsPDF();

    //     let yPos = 10;

    //     doc.text("Feedback Statistics Report", 10, yPos);
    //     yPos += 10;

    //     doc.text(`Average Rating for All Feedbacks: ${averageRating.toFixed(2)}`, 10, yPos);
    //     yPos += 10;

    //     for(const category in categoryAverageRatings) {

    //         doc.text(`${category} Average Rating: ${categoryAverageRatings[category].toFixed(2)}`, 10, yPos);
    //         yPos += 10;

    //     }

    //     doc.save(feedback_statistics_report.pdf);

    // };



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


            {/* <button onClick={generatePDFReport}>Generate PDF Report</button> */}


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


            <div>

                <p>Total Feedbacks: {feedbackCounts.total}</p>
                <p>Salon Feedbacks: {feedbackCounts.Salon}</p>
                <p>Photography Feedbacks: {feedbackCounts.Photography}</p>
                <p>Events Feedbacks: {feedbackCounts.Events}</p>

                <p>Average Rating for All feedbacks: {averageRating.toFixed(2)}</p>
                {Object.keys(categoryAverageRatings).map((category) => (
                    <p key={category}>{`${category} Average Rating: ${categoryAverageRatings[category].toFixed(2)}`}</p>
                ))}
                
            </div>

        </div>

    )

}