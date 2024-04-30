import React, { useState, useEffect } from "react";
import axios from "axios";
import PieChart from "./PieChart";
import '../../css/Maleesha/DashBoardHome.css';

export default function DashboardHome() {
    const [popularServices, setPopularServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Added loading state

    useEffect(() => {
        setIsLoading(true); // Set loading to true before fetching data
        axios.get("/services/popular-services")
            .then(response => {
                setPopularServices(response.data);
                setIsLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error("Error fetching popular services:", error);
                setIsLoading(false); // Ensure loading is set to false even if there's an error
            });
    }, []);

    return (
        <div className="dashboard-home">
            {isLoading ? (
                <div className="spinner-container">
                    {/* Spinner */}
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    <div className="popularService">
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
                    <div className="pie-chart-container">
                        <p>Services Distribution</p>
                        <PieChart />
                    </div>
                    {/* <div className="total-services">
                    <iframe style="background: #F1F5F4;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);width: 100vw;height: 100vh;"  src="https://charts.mongodb.com/charts-project-0-pohxg/embed/dashboards?id=e852bbd6-01ec-4a0c-8def-e57bf6ca8797&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>
                    </div> */}
                </>
            )}
        </div>
    );
}