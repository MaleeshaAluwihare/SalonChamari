import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const SalonBookingDaysChart = () => {
    const [bookingData, setBookingData] = useState(null);
    const [chart, setChart] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (bookingData) {
            createChart();
        }
    }, [bookingData]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8070/SalonBooking/bookingsByWeek");
            setBookingData(response.data.bookingCounts);
        } catch (error) {
            console.error("Error fetching booking data:", error);
        }
    };

    const createChart = () => {
        const ctx = document.getElementById("bookingChart");

        if (ctx) {
            // Destroy previous chart if it exists
            if (chart) {
                chart.destroy();
            }

            const myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    datasets: [
                        {
                            label: "Bookings",
                            data: bookingData,
                            borderColor: "rgb(75, 192, 192)",
                            tension: 0.1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Allow the chart to adapt to its container size
                    scales: {
                        x: {
                            grid: {
                                display: false // Hide x-axis grid lines
                            }
                        },
                        y: {
                            beginAtZero: true // Start y-axis at zero
                        }
                    }
                }
            });

            setChart(myChart);
        }
    };

    return (
        <div style={{ maxWidth: "100vw", maxHeight: "100vh" }}>
            {bookingData ? (
                <canvas id="bookingChart" width="400" height="300"></canvas>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SalonBookingDaysChart;
