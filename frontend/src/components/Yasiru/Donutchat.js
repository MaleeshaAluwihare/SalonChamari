import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const EmployeeAttendanceChart = () => {
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
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <center><h3>Employee Attendance</h3></center>
        <div style={{ width: "500px", height: "500px" }}>
          <Doughnut data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendanceChart;