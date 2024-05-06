import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const EmployeeAttendanceBarChart = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/Attendancecount/all");
        const employeeAttendanceData = response.data.reduce((acc, employee) => {
          const { empId, attendance } = employee;
          const existingEmployee = acc.find((item) => item.empId === empId);
          if (existingEmployee) {
            existingEmployee.attendance += attendance ? 1 : 0;
          } else {
            acc.push({ empId, attendance: attendance ? 1 : 0 });
          }
          return acc;
        }, []);
        setAttendanceData(employeeAttendanceData); 
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: attendanceData.map((item) => `${item.empId} (${((item.attendance / attendanceData.reduce((total, curr) => total + curr.attendance, 0)) * 100).toFixed(2)}%)`),
    datasets: [
      {
        labels: attendanceData.map((item) => `${item.empId} (${((item.attendance / attendanceData.reduce((total, curr) => total + curr.attendance, 0)) * 100).toFixed(2)}%)`),
        data: attendanceData.map((item) => item.attendance),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#36A2EB",
          "#FFCE56",
          "#36A2EB",
          // Add more colors if needed
        ],
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {/* <h2>Employee Attendance</h2> */}
      <div style={{ height: "300px", width: "600px", margin: "0 auto" }}>
        <Bar
          data={chartData}
          options={{
            scales: {
              x: {
                title: {
                  display: true,
                  text: "empId",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Attendance",
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default EmployeeAttendanceBarChart;