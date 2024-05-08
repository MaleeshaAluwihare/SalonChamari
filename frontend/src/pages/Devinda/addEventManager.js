import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const AddEventManager = () => {
    const navigation = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [managerID, setManagerID] = useState("");
    const [bookings, setBookings] = useState("");

    const formContainerStyle = {
        padding: "20px 0",
        textAlign: "center",
        background: "linear-gradient(to bottom, #00416A, #E4E5E6)",
        height: "100vh" // Enlarging container to fit the whole screen
    };

    const formStyle = {
        maxWidth: "400px",
        margin: "0 auto",
        background: "rgba(255, 255, 255, 0.9)",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
    };

    const headerStyle = {
        marginBottom: "20px",
        color: "#00416A",
        fontFamily: "Arial, sans-serif"
    };

    const buttonContainerStyle = {
        marginBottom: "20px"
    };

    const formGroupStyle = {
        marginBottom: "20px"
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
        boxSizing: "border-box"
    };

    const buttonStyle = {
        width: "100%",
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        background: "#00416A",
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer"
    };

    function sendData(event) {
        event.preventDefault();

        const newManager = {
            name,
            email,
            phone,
            managerID,
            bookings
        };

        axios.post("http://localhost:8070/EManager/add", newManager)
            .then(() => {
                alert("Manager is added successfully");
                navigation("/eventManagerDashboard");
            })
            .catch((error) => {
                alert(error);
            });
    }

    return (
        <div id="booking" style={formContainerStyle}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3" style={formStyle}>
                        <div className="form-header" style={headerStyle}>
                            <h1>Event Manager Registration</h1>
                        </div>
                        <div className="button-container" style={buttonContainerStyle}>
                            <Link to="/eventManagerDashboard" style={{ textDecoration: "none" }}>
                                <button style={buttonStyle}>Back to Event Manager Dashboard</button>
                            </Link>
                        </div>
                        <form onSubmit={sendData}>
                            <div className="form-group" style={formGroupStyle}>
                                <input
                                    style={inputStyle}
                                    type="text"
                                    placeholder="Manager Name"
                                    required
                                    onChange={(event) => {
                                        setName(event.target.value);
                                    }}
                                />
                            </div>

                            <div className="form-group" style={formGroupStyle}>
                                <input
                                    style={inputStyle}
                                    type="text"
                                    placeholder="E-mail"
                                    required
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                />
                            </div>

                            <div className="form-group" style={formGroupStyle}>
                                <input
                                    style={inputStyle}
                                    type="tel"
                                    placeholder="Phone number"
                                    required
                                    onChange={(event) => {
                                        setPhone(event.target.value);
                                    }}
                                />
                            </div>

                            <div className="form-group" style={formGroupStyle}>
                                <input
                                    style={inputStyle}
                                    type="text"
                                    placeholder="Manager ID"
                                    required
                                    onChange={(event) => {
                                        setManagerID(event.target.value);
                                    }}
                                />
                            </div>

                            <div className="form-group" style={formGroupStyle}>
                                <input
                                    style={inputStyle}
                                    type="text"
                                    placeholder="Bookings"
                                    required
                                    onChange={(event) => {
                                        setBookings(event.target.value);
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <button type="submit" style={buttonStyle}>Add New Manager</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
