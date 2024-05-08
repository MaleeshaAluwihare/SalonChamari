import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarController
);

const InventoryBarChart = () => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8070/StudioInventory/display");
        const inventoryData = response.data
          .map((product) => ({
            pid: product.pid,
            name: product.name,
            quantity: product.quantity,
          }))
          .filter((item) => item.pid && item.name && item.quantity !== undefined);
        setInventoryData(inventoryData);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchData();
  }, []);

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
        ],
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Inventory ID (Name)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Quantity",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const totalQuantity = inventoryData.reduce(
              (sum, item) => sum + item.quantity,
              0
            );
            const percentage = ((value / totalQuantity) * 100).toFixed(2);
            return `Quantity: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Inventory Quantities</h2>
      {inventoryData.length > 0 ? (
        <div style={{ height: "300px", width: "800px", margin: "0 auto" }}>
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default InventoryBarChart;