import React, { useState, useEffect } from "react";
import axios from "axios";
import PieChart from "./PieChart";
import Styles from '../../css/Maleesha/DashBoardHome.module.css';

export default function DashboardHome() {
    const [popularServices, setPopularServices] = useState([]);

    useEffect(() => {
        axios.get("/services/popular-services")
            .then(response => {
                setPopularServices(response.data);
            })
            .catch(error => {
                console.error("Error fetching popular services:", error);
            });
    }, []);

    const chartUrls = [
        // Define chart URLs here
        "https://charts.mongodb.com/charts-project-0-pohxg/embed/charts?id=663b6091-916c-4e9c-80c2-c690177d2e8d&maxDataAge=3600&theme=light&autoRefresh=true",
        "https://charts.mongodb.com/charts-project-0-pohxg/embed/charts?id=6627ddc4-5bbc-4aa7-8e67-c934d40be377&maxDataAge=300&theme=light&autoRefresh=true"
      ];

    return (
       <div className={Styles.homeContainer}>
            <div className={Styles.dashboardhome}>
            <div className={Styles.popularService}>
                            <p>POPULAR SERVICES</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Service Name</th>
                                        <th>Bookings</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {popularServices.map(service => (
                                        <tr key={service._id}>
                                            <td>{service._id}</td>
                                            <td>{service.count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={Styles.piechartcontainer}>
                            <p>Services Distribution</p>
                            <PieChart />
                        </div>
                        <div className={Styles.totalServices}>
                            {chartUrls.map((url, index) => (
                                <iframe
                                key={index}
                                style={{
                                    width: '60%', // Make the iframes responsive
                                    height: '300px',
                                    border: 'none',
                                    borderRadius: '2px',
                                    boxShadow: '0 2px 10px 0 rgba(70, 76, 79, 0.2)',
                                }}
                                src={url}
                                title={`MongoDB Chart ${index}`}
                                ></iframe>
                            ))}
                            </div>
                     </div>
            </div>
                
    );
}