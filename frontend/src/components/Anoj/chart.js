import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const SingleChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/studio/chart-data');
                const data = response.data.data;
                setChartData(data);
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {chartData && (
                <Bar
                    data={chartData}
                    options={{
                        scales: {
                            yAxes: [{ stacked: true }],
                            xAxes: [{ stacked: true }]
                        }
                    }}
                />
            )}
        </div>
    );
};

export default SingleChart;
