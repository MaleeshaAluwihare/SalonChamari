import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for routing

const SystemAdminPanel = () => {
  const buttonStyle = {
    width: '150px',
    height: '150px',
    margin: '10px',
    padding: '20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none', // To remove underline on hover
  };

  const logoutButtonStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>Admin Panel</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Link to="/eventDashboard" style={buttonStyle}>Event Dashboard</Link>
          <Link to="/financeDashboard" style={buttonStyle}>Finance Dashboard</Link>
          <Link to="/admin" style={buttonStyle}>Studio Dashboard</Link>
          <Link to="/admin/Reservation" style={buttonStyle}>Reservation Dashboard</Link>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Link to="/inventoryDashboard" style={buttonStyle}>Inventory Dashboard</Link>
          <Link to="/dash" style={buttonStyle}>Salon Dashboard</Link>
          <Link to="/employeeDashboard" style={buttonStyle}>Employee Management Dashboard</Link>
          <Link to="/cmdash" style={buttonStyle}>Client Management Dashboard</Link>
        </div>
      </div>
      <button style={logoutButtonStyle}>Log Out</button>
    </div>
  );
};

export default SystemAdminPanel;
