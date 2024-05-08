import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const EventManagerDashboard = () => {
    const navigation = useNavigate()
    const [managers, setManagers] = useState([]);
    const [ID , setID] = useState(null);

    useEffect(() => {
        Axios.get('http://localhost:8070/EManager/')
            .then((getManagers) => {
                setManagers(getManagers.data);
            })
    }, []);

    const onDelete = (_id) => {
        Axios.delete("http://localhost:8070/EManager/delete/" + _id)
            .then(() => {
                // Handle success or update state if needed
            })
            .catch(error => {
                // Handle error
            });
    }

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({ html: '#event-table' });
        doc.save('event_managers.pdf');
    };

    return (
        <div className="event-dashboard" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Event Dashboard</h1>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <Link to="/addEventManager" style={{ textDecoration: "none" }}>
                    <button style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Add Manager</button>
                </Link>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <Link to="/eventDashboard" style={{ textDecoration: "none" }}>
                    <button style={{ padding: "10px 20px", backgroundColor: "#6c757d", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Back to Dashboard</button>
                </Link>
            </div>
            <div>
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="table-wrap">
                                    <table id="event-table" className="table" style={{ width: "100%", borderCollapse: "collapse" }}>
                                        <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
                                            <tr>
                                                <th style={{ padding: "10px" }}>Manager Name</th>
                                                <th style={{ padding: "10px" }}>Manager Email</th>
                                                <th style={{ padding: "10px" }}>Phone Number</th>
                                                <th style={{ padding: "10px" }}>Manager ID</th>
                                                <th style={{ padding: "10px" }}>Bookings</th>
                                                <th style={{ padding: "10px" }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {managers.map((data) => (
                                                <tr key={data._id} style={{ borderBottom: "1px solid #dee2e6" }}>
                                                    <td style={{ padding: "10px" }}>{data.name}</td>
                                                    <td style={{ padding: "10px" }}>{data.email}</td>
                                                    <td style={{ padding: "10px" }}>{data.phone}</td>
                                                    <td style={{ padding: "10px" }}>{data.managerID}</td>
                                                    <td style={{ padding: "10px" }}>{data.bookings}</td>
                                                    <td style={{ padding: "10px" }}>
                                                        <button style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={() => onDelete(data._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <button style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={downloadPDF}>Download PDF</button>
            </div>
        </div>
    );
}

export default EventManagerDashboard;
