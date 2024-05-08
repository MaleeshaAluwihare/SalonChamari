import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export const EventPackageDashboard = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8070/eventPackages")
      .then((getPackages) => {
        setPackages(getPackages.data);
      });
  }, []);

  const setPackage = (_id, pFeatures, pName, pPrice) => {
    localStorage.setItem("pFeatures", pFeatures);
    localStorage.setItem("pName", pName);
    localStorage.setItem("pPrice", pPrice);
    localStorage.setItem("ID", _id);
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: "20px"}}>
        <Link to="/eventDashboard" style={{ textDecoration: "none" }}>
          <button style={{ padding: "10px 20px", fontSize: "16px", fontWeight: "bold", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Back to Dashboard</button>
        </Link>
      </div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", maxWidth: "1200px", width: "100%" }}>
        {packages.map((eventPackage) => (
          <div key={eventPackage._id} style={{ margin: "20px", padding: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", borderRadius: "10px", backgroundColor: "#f8f9fa", width: "300px" }}>
            <div
              onClick={() =>
                setPackage(
                  eventPackage._id,
                  eventPackage.pFeatures,
                  eventPackage.pName,
                  eventPackage.pPrice
                )
              }
            >
              <h1 style={{ marginBottom: "10px", fontSize: "24px", color: "#333" }}>{eventPackage.pName}</h1>
              {eventPackage.pFeatures.map((feature, index) => (
                <p key={index} style={{ fontSize: "16px", color: "#666" }}>{feature}</p>
              ))}
              <h2 style={{ marginTop: "20px", fontSize: "20px", color: "#007bff" }}>{eventPackage.pPrice}</h2>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Link to={"/updateEventPackage"} style={{ textDecoration: "none" }}>
                  <button style={{ padding: "10px 20px", fontSize: "16px", fontWeight: "bold", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }} onClick={() => setPackage(eventPackage._id, eventPackage.pFeatures, eventPackage.pName, eventPackage.pPrice)}>Update</button>
                </Link>
                <Link to={"/deleteEventPackage"} style={{ textDecoration: "none" }}>
                  <button style={{ padding: "10px 20px", fontSize: "16px", fontWeight: "bold", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={() => setPackage(eventPackage._id, eventPackage.pFeatures, eventPackage.pName, eventPackage.pPrice)}>Delete</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPackageDashboard;
