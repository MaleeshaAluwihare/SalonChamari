import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ data }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (data && data.length) {
      const labels = data.map((item) => item.name);
      const quantities = data.map((item) => item.quantity);
      const useQuantities = data.map((item) => item.useQuantity);

      const ctx = document.getElementById("myChart");

      if (chart) {
        chart.destroy(); // Destroy previous chart instance
      }

      setChart(
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Quantity",
                data: quantities,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
              {
                label: "Use Quantity",
                data: useQuantities,
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        })
      );
    }
  }, [data]);

  return <canvas id="myChart" width="400" height="200"></canvas>;
};

export default ChartComponent;
