import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../../images/image03.jpg";
import styles from "../../css/Devinda/eventForm.module.css"; // Importing the CSS module

export const EventForm = () => {
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

    navigate("/eventSummary");
  };

  return (
    <div className={styles.eventFormContainer}>
      <h2 className={styles.formTitle}>Event Registration Form</h2>
      <form className={styles.Eventform} onSubmit={handleSubmit}>
        <label className={styles.formLabel}>
          Name:
          <input
            className={styles.formInput}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label className={styles.formLabel}>
          Phone Number:
          <input
            className={styles.formInput}
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label className={styles.formLabel}>
          Email:
          <input
            className={styles.formInput}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label className={styles.formLabel}>
          Date:
          <input
            className={styles.formInput}
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label className={styles.formLabel}>
          Time:
          <input
            className={styles.formInput}
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label className={styles.formLabel}>
          Venue:
          <input
            className={styles.formInput}
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button className={styles.submitButton} type="submit">Submit</button>
      </form>
    </div>
  );
};