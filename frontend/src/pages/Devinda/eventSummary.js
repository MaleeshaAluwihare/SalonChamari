import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const EventSummary = () => {
  const [ID, setID] = useState(null);
  const [pFeatures, setPackageFeature] = useState("");
  const [pName, setPackageName] = useState("");
  const [pPrice, setPackagePrice] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhoneNumber, setClientPhoneNumber] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * (3 - 1 + 1)) + 1
  );

  const [manager, setManager] = useState(null); // Changed to null initially

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setPackageFeature(localStorage.getItem("pFeatures"));
    setPackageName(localStorage.getItem("pName"));
    setPackagePrice(localStorage.getItem("pPrice"));
    setClientName(localStorage.getItem("clientName"));
    setClientEmail(localStorage.getItem("clientEmail"));
    setClientPhoneNumber(localStorage.getItem("clientPhoneNumber"));
    setEventVenue(localStorage.getItem("eventVenue"));
    setEventTime(localStorage.getItem("eventTime"));
    setEventDate(localStorage.getItem("eventDate"));

    // Fetch a random event manager
    axios
      .get("http://localhost:8070/EManager/") // Assuming this is the correct endpoint for fetching event managers
      .then((response) => {
        const managers = response.data;
        const randomIndex = Math.floor(Math.random() * managers.length);
        setManager(managers[randomIndex]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const printPDF = () => {
    const input = document.getElementById("summary");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("summary.pdf");
    });
  };

  return (
    <div
      className="page-container"
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#ffffff", // changed background color to white
        padding: "20px",
        minHeight: "100vh", // changed maxHeight to minHeight to allow for full-page height
        boxSizing: "border-box", // added to include padding in the height calculation
      }}
    >
      <h1 style={{ color: "#1175e1cc", textAlign: "center" }}>
        Event Summary
      </h1> {/* Page heading */}
      <div className="image-grid" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div
          key={ID}
          className="image-card"
          id="summary"
          style={{
            background: "#1175e1cc",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "0px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <h1>{pName}</h1>
            <p style={{ marginBottom: "10px" }}>
              <strong>Client Name:</strong> {clientName}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Client Email:</strong> {clientEmail}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Client Phone Number:</strong> {clientPhoneNumber}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Event Date:</strong> {eventDate}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Event Time:</strong> {eventTime}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Event Venue:</strong> {eventVenue}
            </p>
            <h2>{pPrice}</h2>
            {manager && (
              <div>
                <p style={{ marginBottom: "10px" }}>
                  <strong>Event Manager:</strong> {manager.name}
                </p>
                <p style={{ marginBottom: "10px" }}>
                  <strong>Manager Email:</strong> {manager.email}
                </p>
                <p style={{ marginBottom: "10px" }}>
                  <strong>Manager Phone:</strong> {manager.phone}
                </p>
              </div>
            )}
            <div className="button-container">
              <button
                className="btn btn-danger text-uppercase mr-2 px-4"
                onClick={printPDF}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSummary;
