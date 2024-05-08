import React from "react";
import { Link } from "react-router-dom";

export const EventDashBoard = () => {
  return (
    <div style={{backgroundColor:"white",position:"absolute",top:0,left:0,width: "100%", height:"100%" }}>
            <div style={{ textAlign: "center", marginTop: "50px"}}>
      <h1 style={{ fontSize: "2rem", marginBottom: "30px",color:"black" }}>Event Dashboard</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/eventManagerDashboard" style={{ textDecoration: "none", margin: "0 10px" }}>
          <button style={{ padding: "10px 20px", fontSize: "1rem", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Event Manager</button>
        </Link>

        <Link to="/packageDashboard" style={{ textDecoration: "none", margin: "0 10px" }}>
          <button style={{ padding: "10px 20px", fontSize: "1rem", backgroundColor: "#2196F3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Event Packages</button>
        </Link>

        <Link to="/eventCustomPackageDashboard" style={{ textDecoration: "none", margin: "0 10px" }}>
          <button style={{ padding: "10px 20px", fontSize: "1rem", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Custom Packages</button>
        </Link>
      </div>
    </div>
    </div>

  );
};
