import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

export const UpdateEventPackage = () => {
  const navigation = useNavigate();
  const [pFeatures, setPackageFeature] = useState("");
  const [pName, setPackageName] = useState("");
  const [pPrice, setPackagePrice] = useState("");
  const [ID, setID] = useState(null);

  const sendDataToUpdate = () => {
    Axios.put('http://localhost:8070/eventPackages/update/' + ID, {
      pName,
      pFeatures,
      pPrice
    });
    navigation("/packageDashboard");
  };

  useEffect(() => {
    setPackageName(localStorage.getItem("pName"));
    setPackageFeature(localStorage.getItem("pFeatures"));
    setPackagePrice(localStorage.getItem("pPrice"));
    setID(localStorage.getItem("ID"));
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <form onSubmit={sendDataToUpdate}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Package Name:</label>
            <input
              style={styles.input}
              type="text"
              value={pName}
              name="pname"
              onChange={(e) => setPackageName(e.target.value)}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Package Features:</label>
            <input
              style={styles.input}
              type="text"
              value={pFeatures}
              name="pFeatures"
              onChange={(e) => setPackageFeature(e.target.value)}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Package Price:</label>
            <input
              style={styles.input}
              type="text"
              value={pPrice}
              name="Price"
              onChange={(e) => setPackagePrice(e.target.value)}
            />
          </div>

          <div style={styles.formBtn}>
            <button type="submit" style={styles.submitBtn}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f2f2f2',
  },
  formContainer: {
    width: '400px',
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formLabel: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  formBtn: {
    textAlign: 'center',
  },
  submitBtn: {
    padding: '10px 20px',
    fontSize: '16px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};
