import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import styles from '../../css/nisalka/dashboardStyles.module.css';
import homeSticker from '../../images/nisalka/home-icon-silhouette.png'
import { Colors } from 'chart.js';

const CMdashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const location = useLocation();
  const userActivityContainerRef = useRef(null);
  const userTableContainerRef = useRef(null);

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
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = (data) => {
    return data.filter((user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.lastLogin.includes(searchTerm)
    );
  };

  const handleSendMassEmail = async () => {
    try {
      await axios.post('http://localhost:8070/api/users/send-mass-email', {
        subject,
        text,
      });
      alert('Mass email sent successfully');
    } catch (error) {
      console.error('Error sending mass email:', error);
      alert('Error sending mass email');
    }
  };

  const handleGenerateUserActivityReport = () => {
    const doc = new jsPDF();
    const tableData = [];

    // Get table headers
    const headers = ['Email', 'Last Active'];
    tableData.push(headers);

    // Get table rows
    filteredUsers(users).forEach((user) => {
      const rowData = [user.email, user.lastLogin];
      tableData.push(rowData);
    });

    // Configure table styles
    const tableWidth = doc.internal.pageSize.getWidth() - 40;
    const tableHeight = doc.internal.pageSize.getHeight() - 100;
    const cellPadding = 5;

    // Add table to PDF
    doc.autoTable({
      head: [tableData[0]],
      body: tableData.slice(1),
      startY: 20,
      margin: { left: 20, right: 20 },
      styles: {
        fontSize: 10,
        cellPadding: cellPadding,
        halign: 'left',
        valign: 'middle',
      },
      columnWidth: 'auto',
      overflowColumnsMode: 'splitPages',
      tableWidth: tableWidth,
      tableHeight: tableHeight
    });

    // Open PDF in a new window
    const previewWindow = window.open();
    previewWindow.document.write('<iframe src="' + doc.output('datauristring') + '" width="100%" height="100%"></iframe>');
  };

  const handleGenerateUserTableReport = () => {
    const doc = new jsPDF();
    const tableData = [];

    // Get table headers
    const headers = ['Full Name', 'Email', 'Phone', 'Age', 'Gender'];
    tableData.push(headers);

    // Get table rows
    filteredUsers(users).forEach((user) => {
      const rowData = [
        user.fullName,
        user.email,
        user.phone,
        user.age,
        user.gender
      ];
      tableData.push(rowData);
    });

    // Configure table styles
    const tableWidth = doc.internal.pageSize.getWidth() - 40;
    const tableHeight = doc.internal.pageSize.getHeight() - 100;
    const cellPadding = 5;

    // Add table to PDF
    doc.autoTable({
      head: [tableData[0]],
      body: tableData.slice(1),
      startY: 20,
      margin: { left: 20, right: 20 },
      styles: {
        fontSize: 10,
        cellPadding: cellPadding,
        halign: 'left',
        valign: 'middle',
      },
      columnWidth: 'auto',
      overflowColumnsMode: 'splitPages',
      tableWidth: tableWidth,
      tableHeight: tableHeight,
    });

    // Open PDF in a new window
    const previewWindow = window.open();
    previewWindow.document.write('<iframe src="' + doc.output('datauristring') + '" width="100%" height="100%"></iframe>');
  };
  

  return (
    <div className={styles.dashboardContainer1}> {/* Use CSS module class */}
      <div className={styles.navPanel1}>
      <h2 className={styles.headingNav}>Client Management Dashboard</h2>
      <ul>
        <li>
          <NavLink
            to="/cmdash"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            User Information Table
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Uactivity"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            User Activity table
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Memails"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Mass Emails
          </NavLink>
        </li>
      </ul>
      <a href="/your-target-page">
        <img src={homeSticker} alt="home" className={styles.homesticker} />
      </a>
    </div>
      
      {location.pathname === '/Memails' ? (
        <div className={styles.econtainer}>
        <div className={styles.emailsContainer}>
          <h1 className={styles.dashboardHeading12}>Mass Emails</h1>
          <div>
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="text">Text:</label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <button onClick={handleSendMassEmail}>Send Mass Email</button>
        </div>
      </div>
        ) :location.pathname === '/Uactivity' ? (
        <div className={styles.userActivityContainer}>
          <h5 className={styles.dashboardHeading1}>User Activity Table</h5>
          <div className={styles.searchBar1}> {/* Use CSS module class */}
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <button className={styles.generateReportBtn1} onClick={handleGenerateUserActivityReport}> {/* Use CSS module class */}
            Generate Report
          </button>
          <div id="user-activity-container" ref={userActivityContainerRef} className={styles.tableContainer1}>
            <table className={styles.userTable1}>
              <thead>
                <tr>
                  <th className={styles.tableHeader1}>Email</th>
                  <th className={styles.tableHeader1}>Last Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers(users).map((user) => (
                  <tr key={user.email}>
                    <td className={styles.userData1}>{user.email}</td>
                    <td className={styles.userData1}>{user.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className={styles.cmDashboardContainer1}> {/* Use CSS module class */}
          <h1 className={styles.dashboardHeading1}>User Informations Table</h1> {/* Use CSS module class */}
          <div className={styles.searchBar1}> {/* Use CSS module class */}
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <button className={styles.generateReportBtn1} onClick={handleGenerateUserTableReport}> {/* Use CSS module class */}
            Generate Report
          </button>
          <div id="user-table-container" ref={userTableContainerRef} className={styles.tableContainer1}> {/* Use CSS module class */}
            <table className={styles.userTable1}> {/* Use CSS module class */}
              <thead>
                <tr>
                  <th className={styles.tableHeader1}>Full Name</th> {/* Use CSS module class */}
                  <th className={styles.tableHeader1}>Email</th> {/* Use CSS module class */}
                  <th className={styles.tableHeader1}>Phone</th> {/* Use CSS module class */}
                  <th className={styles.tableHeader1}>Age</th> {/* Use CSS module class */}
                  <th className={styles.tableHeader1}>Gender</th> {/* Use CSS module class */}
                  <th className={styles.tableHeader1}>Password</th> {/* Use CSS module class */}
                  <th className={styles.tableHeader1}>Actions</th> {/* Use CSS module class */}
                </tr>
              </thead>
              <tbody>
                {filteredUsers(users).map((user) => (
                  <tr key={user.email} className={styles.userRow1}> {/* Use CSS module class */}
                    <td className={styles.userData1}>{user.fullName}</td> {/* Use CSS module class */}
                    <td className={styles.userData1}>{user.email}</td> {/* Use CSS module class */}
                    <td className={styles.userData1}>{user.phone}</td> {/* Use CSS module class */}
                    <td className={styles.userData1}>{user.age}</td> {/* Use CSS module class */}
                    <td className={styles.userData1}>{user.gender}</td> {/* Use CSS module class */}
                    <td className={styles.userData1}>{user.password}</td> {/* Use CSS module class */}
                    <td className={styles.userData1}>
                      <button onClick={() => handleDelete(user.email)} className={styles.deleteBtn1}> {/* Use CSS module class */}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CMdashboard;
