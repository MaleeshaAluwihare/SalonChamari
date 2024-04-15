import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateFaq = () => {
  const { faqId } = useParams(); // Get FAQ ID from URL params
  
  const [faqData, setFaqData] = useState({
    question: '',
    answer: '',
  });

  // Fetch the FAQ data by ID on component mount
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/Faqs/get/${faqId}`);
        const { question, answer } = response.data.faq;
        setFaqData({ question, answer });
      } catch (error) {
        console.error('Error fetching FAQ', error);
      }
    };

    fetchFaq(); // Call the fetch function
  }, [faqId]); // Re-run effect when faqId changes

  // Update the input fields as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaqData({ ...faqData, [name]: value });
  };

  // Handle form submission to update the FAQ
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8070/Faqs/update/${faqId}`, faqData);
      alert('FAQ updated successfully');
    } catch (error) {
      console.error('Error updating FAQ', error);
    }
  };

  return (
    <div>
      <h2>Update FAQ</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            value={faqData.question}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="answer">Answer:</label>
          <textarea
            id="answer"
            name="answer"
            value={faqData.answer}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>
        <button type="submit">Update FAQ</button>
      </form>
    </div>
  );
};

export default UpdateFaq;


