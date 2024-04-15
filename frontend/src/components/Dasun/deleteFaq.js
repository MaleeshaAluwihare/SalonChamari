import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteFaq = () => {
  const { faqId } = useParams(); // Get FAQ ID from URL params
  
  const [faq, setFaq] = useState(null);

  // Fetch the FAQ data by ID on component mount
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/Faqs/get/${faqId}`);
        setFaq(response.data.faq);
      } catch (error) {
        console.error('Error fetching FAQ', error);
      }
    };

    fetchFaq(); // Call the fetch function
  }, [faqId]); // Re-run effect when faqId changes

  // Handle delete button click
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8070/Faqs/delete/${faqId}`);
      alert('FAQ deleted successfully');
    } catch (error) {
      console.error('Error deleting FAQ', error);
    }
  };

  if (!faq) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  return (
    <div>
      <h2>Delete FAQ</h2>
      <p>
        Are you sure you want to delete the following FAQ?
      </p>
      <p>
        <strong>Question:</strong> {faq.question}
      </p>
      <p>
        <strong>Answer:</strong> {faq.answer}
      </p>
      <button onClick={handleDelete}>Delete FAQ</button>
    </div>
  );
};

export default DeleteFaq;
