import React, { useState, useEffect } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const CustomEventSummary = () => {
  const [ID, setID] = useState(null);
  const [customPackageFeatures, setCustomPackageFeatures] = useState([]);
  const [customPackageTotalPrice, setCustomPackageTotalPrice] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhoneNumber, setClientPhoneNumber] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [manager, setManager] = useState(null);

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setCustomPackageFeatures(JSON.parse(localStorage.getItem("selectedFeatures")));
    setCustomPackageTotalPrice(localStorage.getItem("customEventTotalPrice"));
    setClientName(localStorage.getItem("clientName"));
    setClientEmail(localStorage.getItem("clientEmail"));
    setClientPhoneNumber(localStorage.getItem("clientPhoneNumber"));
    setEventVenue(localStorage.getItem("eventVenue"));
    setEventTime(localStorage.getItem("eventTime"));
    setEventDate(localStorage.getItem("eventDate"));

    axios
      .get("http://localhost:8070/EManager/")
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
    <div className="page-container" style={{ fontFamily: "Arial, sans-serif", background: "#f6f6f6", padding: "20px" }}>
      <div className="image-grid">
        <div key={ID} className="image-card" id="summary" style={cardStyle}>
          <div>
            <h1 style={headerStyle}>Custom Event Package Summary</h1>
            <div style={infoStyle}>
              <p><strong>Client Name:</strong> {clientName}</p>
              <p><strong>Client Email:</strong> {clientEmail}</p>
              <p><strong>Client Phone:</strong> {clientPhoneNumber}</p>
              <p><strong>Event Date:</strong> {eventDate}</p>
              <p><strong>Event Time:</strong> {eventTime}</p>
              <p><strong>Event Venue:</strong> {eventVenue}</p>
              {customPackageFeatures.map((feature, index) => (
                <p key={index}><strong>Feature:</strong> {feature.cpFeature}</p>
              ))}
              <h2 style={{ textAlign: "center", marginTop: "20px", color: "#ff5a5f" }}>Total Price: Rs. {customPackageTotalPrice}</h2>
              {manager && (
                <div style={{ marginTop: "20px", background: "#fff", padding: "15px", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
                  <h3 style={{ marginBottom: "10px", color: "#ff5a5f" }}>Event Manager Details</h3>
                  <p><strong>Name:</strong> {manager.name}</p>
                  <p><strong>Email:</strong> {manager.email}</p>
                  <p><strong>Phone:</strong> {manager.phone}</p>
                </div>
              )}
            </div>
            <div className="button-container" style={{ textAlign: "center", marginTop: "20px" }}>
              <button className="btn btn-danger text-uppercase mr-2 px-4" onClick={printPDF} style={{ background: "#ff5a5f", border: "none", borderRadius: "20px", padding: "10px 20px", color: "#fff", fontSize: "16px", cursor: "pointer", transition: "background 0.3s" }}>
                Print Summary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  margin: "auto",
  maxWidth: "600px",
  padding: "20px",
};

const headerStyle = {
  textAlign: "center",
  fontSize: "28px",
  color: "#ff5a5f",
  marginBottom: "20px",
};

const infoStyle = {
  marginTop: "20px",
};
