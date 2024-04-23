import React, {useState, useEffect} from "react";
import '../../CSS/Dasun/allFeedbacks.css';
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

        <div id="feedback_page" >

            <h1 id="feedback_page_heading" >Customer Feedbacks</h1> <br />

            <div id="feedback_page_category_filter" >

                <label id="feedback_page_category_filter_label" htmlFor="categoryFilter">Filter by Category</label>

                <select 
                    id= "feedback_page_category_filter_select"
                    value={selectedCategory}
                    onChange={(e) => handleCategoryFilter(e.target.value)}
                >

                    <option id="feedback_page_category_filter_option1" value="All">All</option>
                    <option id="feedback_page_category_filter_option2" value="Salon">Salon</option>
                    <option id="feedback_page_category_filter_option3" value="Photography">Photography</option>
                    <option id="feedback_page_category_filter_option4" value="Events">Events</option>

                </select>


            </div>


            <div id="feedback_page_rating_filter" >

                <label id="feedback_page_rating_filter_label" htmlFor="ratingFilter">Filter by Rating</label>

                <select 
                    id= "feedback_page_rating_filter_select"
                    value={selectedRating}
                    onChange={(e) => handleRatingFilter(e.target.value)}
                >

                    <option id="feedback_page_rating_filter_option1" value="All">All</option>
                    <option id="feedback_page_rating_filter_option2" value="0">0</option>
                    <option id="feedback_page_rating_filter_option3" value="1">1</option>
                    <option id="feedback_page_rating_filter_option4" value="2">2</option>
                    <option id="feedback_page_rating_filter_option5" value="3">3</option>
                    <option id="feedback_page_rating_filter_option6" value="4">4</option>
                    <option id="feedback_page_rating_filter_option7" value="5">5</option>




                </select>


            </div>


            <br />


            {/* <button onClick={generatePDFReport}>Generate PDF Report</button> */}


            <br />

            <table id="feedback_page_table" className="FaqTable">
                <thead id="feedback_page_table_header" className="theader">
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
                

                <tbody id="feedback_page_table_body" className="tbody">
                    {filteredFeedbacks.map(feedbacks => (
                        <tr key={feedbacks._id}>
                            <td id="feedback_page_table_body_1" >{feedbacks.feedbackId}</td>
                            <td id="feedback_page_table_body_2" >{feedbacks.bookingId}</td>
                            <td id="feedback_page_table_body_3" >{feedbacks.category}</td>
                            <td id="feedback_page_table_body_4" >{feedbacks.content}</td>
                            <td id="feedback_page_table_body_5" >{feedbacks.rating}</td>
                            <td id="feedback_page_table_body_6" >{formatDate(feedbacks.sendDate)}</td>
                            <td><Link to={"#"}><button className="ReplyBtn" id="feedback_page_table_body_replyBtn" >Reply</button></Link>
                            <Link to={`/feedback/delete/${feedbacks.feedbackId}`}><button className="DeleteBtn" id="feedback_page_table_body_deleteBtn" >Delete</button></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br/>


            <div id="feedback_page_stats" >

                <p id="feedback_page_stats_totalFeedbacks" >Total Feedbacks: {feedbackCounts.total}</p> <br />
                <p id="feedback_page_stats_salonFeedbacks" >Salon Feedbacks: {feedbackCounts.Salon}</p>
                <p id="feedback_page_stats_photoFeedbacks" >Photography Feedbacks: {feedbackCounts.Photography}</p>
                <p id="feedback_page_stats_eventFeedbacks" >Events Feedbacks: {feedbackCounts.Events}</p> <br />

                <p id="feedback_page_stats_Average" >Average Rating for All feedbacks: {averageRating.toFixed(2)}</p>
                {Object.keys(categoryAverageRatings).map((category) => (
                    <p key={category}>{`${category} Average Rating: ${categoryAverageRatings[category].toFixed(2)}`}</p>
                ))}
                
            </div>

        </div>

    )

}