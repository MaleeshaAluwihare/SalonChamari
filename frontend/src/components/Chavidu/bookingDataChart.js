import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import generateReport from "../../components/Chavidu/studioReport";

const chartUrls = [
  // Define chart URLs here
  "https://charts.mongodb.com/charts-project-0-pohxg/embed/charts?id=6627b51d-06fe-4c98-8f32-4cea8a57b292&maxDataAge=300&theme=light&autoRefresh=true",
  "https://charts.mongodb.com/charts-project-0-pohxg/embed/charts?id=6627dc15-3f3d-45fc-88b2-d54e184b7327&maxDataAge=1800&theme=light&autoRefresh=true",
  "https://charts.mongodb.com/charts-project-0-pohxg/embed/charts?id=6637384e-89f7-4a45-8104-6fe5640410d8&maxDataAge=300&theme=light&autoRefresh=true",
];

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
      // Get today's date
      const today = new Date();
      // Calculate the first day of the previous month
      const firstDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      
      // Filter bookings for the past month
      const bookingsForPastMonth = bookingData.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate >= firstDayOfPreviousMonth && bookingDate <= today;
      });

      // Update booking counts by day for bookings in the past month
      bookingsForPastMonth.forEach((booking) => {
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

  return (
    <div>
      <canvas id="bookingChart" />
      <div
        style={{
          display:'block',
          gap: '20px',
          justifyContent: 'space-between', // Equal spaces between items
        }}
      >
        {chartUrls.map((url, index) => (
          <iframe
            key={index}
            style={{
              width: '40%', 
              height: '200px',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, 0.2)',
              margin: '20px'
            }}
            src={url}
            title={`MongoDB Chart ${index}`}
          ></iframe>
        ))}
      </div>
      <div>
        <generateReport />
      </div>
    </div>
  );
};

export default PeakBookingDaysChart;
