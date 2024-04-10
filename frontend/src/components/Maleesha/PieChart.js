import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default function MyComponent() {
    const [, setPopularServices] = useState([]);
    const [, setChartData] = useState([]);
    const chartRef = useRef(null); // Ref for storing chart instance

    useEffect(() => {
        // Fetch popular services
        axios.get('/services/popular-services')
            .then(response => setPopularServices(response.data))
            .catch(error => console.error('Error fetching popular services:', error));

        // Fetch data for pie chart
        axios.get('/services/pie-chart-data')
            .then(response => {
                setChartData(response.data);
                renderPieChart(response.data);
            })
            .catch(error => console.error('Error fetching pie chart data:', error));
    }, []);

    const renderPieChart = (data) => {
        const labels = data.map(item => item.serviceName);
        const percentages = data.map(item => item.percentage);

        // Check if chart instance exists and destroy it before rendering a new one
        if (chartRef.current !== null) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById('pieChart');
        chartRef.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Percentage of Items',
                    data: percentages,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false
            }
        });
    };

    return (
        <div>
            <div>
                <canvas id="pieChart" width="300" height="300"></canvas>
            </div>
        </div>
    );
}
