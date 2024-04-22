import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteMessage = () => {
  const { messageId } = useParams(); // Get Message ID from URL params
  
  const [message, setMessage] = useState(null);

  // Fetch the Message data by ID on component mount
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/CustomerMessages/get/${messageId}`);
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching Message', error);
      }
    };

    fetchMessage(); // Call the fetch function
  }, [messageId]); // Re-run effect when faqId changes

  // Handle delete button click
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8070/CustomerMessages/delete/${messageId}`);
      alert('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting Message', error);
    }
  };

  if (!message) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  return (
    <div>
      <h2>Delete Message</h2>
      <p>
        Are you sure you want to delete the following Message?
      </p>
      <p>
        <strong>Message ID:</strong> {message.messageId}
      </p>
      <p>
        <strong>Customer ID:</strong> {message.customerId}
      </p>
      <p>
        <strong>Message:</strong> {message.message}
      </p>
      <p>
        <strong>Date:</strong> {message.date}
      </p>
      <button onClick={handleDelete}>Delete Message</button>
      <Link to={`/CustomerMessages/all`}> <button> Cancel </button> </Link>
    </div>
  );
};

export default DeleteMessage;