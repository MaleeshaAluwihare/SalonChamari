import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from '../../css/Yasiru/attendancecountStyle.module.css';
import AttendenceTable from '../../components/Yasiru/Attendance';

export default function Attendancecount() {
  const [dailyAttendanceCount, setDailyAttendanceCount] = useState(0);
  const [filter, setFilter] = useState('Today');

  const deleteEmployee = (empId) => {
    axios.delete(`/Attendancecount/delete/${empId}`).then(res => {
      alert('Employee deleted');
      // Update the employee list after deletion if necessary
    }).catch(error => {
      alert(error.response.data.status);
    });
  };

  useEffect(() => {
    fetchAttendanceCount();
  }, [filter]);
  
  const fetchAttendanceCount = async () => {
    try {
      const response = await axios.get(`/Attendancecount/${filter.toLowerCase()}`);
      setDailyAttendanceCount(response.data.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className={styles.page}>
      <div className={styles.attendanceContainer}>
        <label htmlFor="filter">Filter:</label>
        <select id="filter" onChange={handleChangeFilter} value={filter}>
          <option value="Today">Today</option>
          <option value="ThisWeek">This Week</option>
          <option value="ThisMonth">This Month</option>
        </select>
        <div className={styles.attendanceCount}>
          <h2>Daily Attendance Count: {dailyAttendanceCount}</h2>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <AttendenceTable />
      </div>
    </div>
  );
}
