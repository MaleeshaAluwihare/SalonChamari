import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteFeedback = () => {
  const { feedbackId } = useParams(); // Get Feedback ID from URL params
  
  const [feedback, setFeedback] = useState(null);

  // Fetch the Feedback data by ID on component mount
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/Feedback/get/${feedbackId}`);
        setFeedback(response.data.feedback);
      } catch (error) {
        console.error('Error fetching Feedback', error);
      }
    };

    fetchFeedback(); // Call the fetch function
  }, [feedbackId]); // Re-run effect when faqId changes

  // Handle delete button click
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8070/Feedback/delete/${feedbackId}`);
      alert('Feedback deleted successfully');
    } catch (error) {
      console.error('Error deleting Feedback', error);
    }
  };

  if (!feedback) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  return (
    <div>
      <h2>Delete Feedback</h2>
      <p>
        Are you sure you want to delete the following Feedback?
      </p>
      <p>
        <strong>Feedback ID:</strong> {feedback.feedbackId}
      </p>
      <p>
        <strong>Booking ID:</strong> {feedback.bookingId}
      </p>
      <p>
        <strong>Category:</strong> {feedback.category}
      </p>
      <p>
        <strong>Feedback:</strong> {feedback.content}
      </p>
      <p>
        <strong>Rating:</strong> {feedback.rating}
      </p>
      <p>
        <strong>Date :</strong> {feedback.sendDate}
      </p>
      <button onClick={handleDelete}>Delete FAQ</button>
      <Link to={`/feedback/all`}> <button> Cancel </button> </Link>
    </div>
  );
};

export default DeleteFeedback;
