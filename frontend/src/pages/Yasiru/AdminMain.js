// import React from 'react';

// const AdminMain = () => {
//   const buttonStyle = {
//     width: '150px',
//     height: '150px',
//     margin: '10px',
//     padding: '20px',
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     fontSize: '20px',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//   };

//   const logoutButtonStyle = {
//     position: 'absolute',
//     bottom: '20px',
//     left: '50%',
//     transform: 'translateX(-50%)',
//     padding: '10px 20px',
//     backgroundColor: '#f44336',
//     color: 'white',
//     fontSize: '16px',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//   };

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h1 style={{ marginBottom: '20px' }}>Admin Panel</h1>
//       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
//         {[...Array(8).keys()].map((index) => (
//           <button key={index} style={buttonStyle}>{Button ${index + 1}}</button>
//         ))}
//       </div>
//       <button style={logoutButtonStyle}>Log Out</button>
//     </div>
//   );
// };

// export default AdminMain ;