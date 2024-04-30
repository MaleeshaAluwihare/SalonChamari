import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const PeakBookingDaysChart = () => {
  const [bookingData, setBookingData] = useState([]);
  const chartRef = useRef(null); // Ref to store chart instance

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get("http://localhost:8070/StudioBooking/studiobookings");
        const { data } = response;
        setBookingData(data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchBookingData();
  }, []);

  useEffect(() => {
    
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    
    const bookingCountsByDay = Object.fromEntries(daysOfWeek.map(day => [day, 0]));

    
    if (bookingData.length > 0) {
      bookingData.forEach((booking) => {
        const date = new Date(booking.date);
        const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
        bookingCountsByDay[dayOfWeek] = (bookingCountsByDay[dayOfWeek] || 0) + 1;
      });
    }

    // Destroy previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Chart creation logic
    const ctx = document.getElementById("bookingChart");

    // Extract booking counts from bookingCountsByDay
    const bookingCounts = Object.values(bookingCountsByDay);

    // Create the chart
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: daysOfWeek,
        datasets: [
          {
            label: "Booking Count",
            data: bookingCounts,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Peak Booking Days",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Day of the Week",
            },
          },
          y: {
            title: {
              display: true,
              text: "Booking Count",
            },
            min: 0,
          },
        },
      },
    });
  }, [bookingData]);

  return <canvas id="bookingChart" />;
};

export default PeakBookingDaysChart;
