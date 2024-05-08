import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../../images/image03.jpg"

export const CustomEventForm = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhoneNumber, setClientPhoneNumber] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [randomNumber, setRandomNumber] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState("");

  useEffect(() => {
    setClientName(localStorage.getItem("clientName"));
    setClientEmail(localStorage.getItem("clientEmail"));
    setClientPhoneNumber(localStorage.getItem("clientPhoneNumber"));
    setEventVenue(localStorage.getItem("eventVenue"));
    setEventTime(localStorage.getItem("eventTime"));
    setEventDate(localStorage.getItem("eventDate"));
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    venue: "",
    time: "",
    date: "",
  });

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const newRandomNumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    setRandomNumber(newRandomNumber);
    
    // Reset form fields after submission
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      venue: "",
      time: "",
      date: "",
    });

    localStorage.setItem("clientName", formData.name);
    localStorage.setItem("clientEmail", formData.email);
    localStorage.setItem("clientPhoneNumber", formData.phoneNumber);
    localStorage.setItem("eventVenue", formData.venue);
    localStorage.setItem("eventTime", formData.time);
    localStorage.setItem("eventDate", formData.date);
    localStorage.setItem("randomNumber", randomNumber);

    navigate("/customEventSummary");
  };

  const formStyle = {
    
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    margin: "0 auto",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    boxSizing: "border-box",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div style={formStyle}>
      <div>
        <h2>Custom Event Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />
          </label>
          <br />

          <label>
            Phone Number:
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />
          </label>
          <br />
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />
          </label>
          <br />
          <label>
            Time:
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />
          </label>
          <br />
          <label>
            Venue:
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />
          </label>
          <br />
          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
};
