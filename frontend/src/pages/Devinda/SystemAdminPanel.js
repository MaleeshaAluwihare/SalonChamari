import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for routing

const SystemAdminPanel = () => {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () =>{
      try{
          const response = await fetch('/api/admin/check-auth',{

          credentials:'include',
        });
        if(response.ok){
          setIsAuthenticated(true)
        }else{
          //console.log('checkAuth error')
          navigate('/adlogin');
        }
      }catch(error){
        //console.log('checkAuth error2')
        navigate('/adlogin');
      }
    }

    checkAuth();
  },[navigate]);

  const handleLogout = async () =>{
    try{
      const response = await fetch('/api/admin/logout',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        credentials:'include',
      })
      if(response.ok){
        navigate('/adlogin');
      }
    }catch(error){
      console.error('Logout failed',error);
    }
  };

  if(!isAuthenticated){
    return <div>Loading...</div>;
  }



  const containerStyle = {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

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
    <div style={containerStyle}>
      <h1 style={{ marginBottom: '20px', color: 'black',fontSize:'70px' }}>Admin Panel</h1>
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
          <Link to="/EmpDash" style={buttonStyle}>Employee Management Dashboard</Link>
          <Link to="/cmdash" style={buttonStyle}>Client Management Dashboard</Link>
        </div>
      </div>
      
      <button style={logoutButtonStyle} onClick={handleLogout}>Log Out</button>
      
    </div>
  );
};

export default SystemAdminPanel;
