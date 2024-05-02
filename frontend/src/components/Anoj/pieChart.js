import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const InventoryChart = () => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8070/StudioInventory/display");
        const inventoryData = response.data.map((product) => ({
          pid: product.pid,
          name: product.name,
          quantity: product.quantity,
        }));
        setInventoryData(inventoryData);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchData();
  }, []);

  const totalQuantity = inventoryData.reduce((total, item) => total + item.quantity, 0);

  const chartData = {
    labels: inventoryData.map((item) => `${item.pid} (${item.name})`),
    datasets: [
      {
        data: inventoryData.map((item) => item.quantity),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          // Add more colors if needed
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.formattedValue;
            const percentage = ((context.raw / totalQuantity) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div>
        <h2 style={{ textAlign: "center" }}>Inventory Distribution</h2>
        <div style={{ width: "300px", height: "300px", margin: "0 auto" }}>
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default InventoryChart;