import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../../css/nisalka/dashboardStyles.css'

const CMdashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/users/display');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:8070/api/users/delete/${email}`);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleGenerateReport = () => {
    const input = document.getElementById('user-table-container');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save('customer_management_report.pdf');
    });
  };

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  return (
    <div className="cm-dashboard-container">
      <button class="home-btn">Home</button>
      <h1 className="dashboard-heading">Customer Management Dashboard</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <button className="generate-report-btn" onClick={handleGenerateReport}>
        Generate Report
      </button>
      <div id="user-table-container" className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th className="table-header">Full Name</th>
              <th className="table-header">Email</th>
              <th className="table-header">Phone</th>
              <th className="table-header">Age</th>
              <th className="table-header">Gender</th>
              <th className="table-header">Password</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.email} className="user-row">
                <td className="user-data">{user.fullName}</td>
                <td className="user-data">{user.email}</td>
                <td className="user-data">{user.phone}</td>
                <td className="user-data">{user.age}</td>
                <td className="user-data">{user.gender}</td>
                <td className="user-data">{user.password}</td>
                <td className="user-data">
                  <button onClick={() => handleDelete(user.email)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CMdashboard;
