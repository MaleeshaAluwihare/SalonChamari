import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

export default function ServicePieChart() {
    const [serviceData, setServiceData] = useState([]);

    useEffect(() => {
        fetchServiceData();
    }, []);

    const fetchServiceData = () => {
        // Fetch data from backend API to get the count of items under each service name
        axios.get("/services/pie-chart-data")
            .then(response => {
                setServiceData(response.data);
            })
            .catch(error => {
                console.error("Error fetching service data:", error);
            });
    };

    const calculatePercentage = (count, total) => {
        return ((count / total) * 100).toFixed(2);
    };

    const renderPieChart = () => {
        const labels = serviceData.map(service => service.serviceName);
        const data = serviceData.map(service => {
            return calculatePercentage(service.itemCount, service.totalItems);
        });

        const pieChartData = {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        // Add more colors as needed
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        // Add more colors as needed
                    ]
                }
            ]
        };

        return <Pie data={pieChartData} />;
    };

    return (
        <div>
            <h2>Service Distribution</h2>
            {renderPieChart()}
        </div>
    );
};

