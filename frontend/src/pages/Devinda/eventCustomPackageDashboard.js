import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BackendURL = 'http://localhost:8070/eCPackage'; // Adjust the URL according to your backend server

const FeatureList = () => {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState('');
  const [newFeaturePrice, setNewFeaturePrice] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BackendURL}/`);
      setFeatures(response.data);
    } catch (error) {
      console.error('Error fetching features:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BackendURL}/delete/${id}`);
      fetchData(); // Refresh feature list after deletion
    } catch (error) {
      console.error('Error deleting feature:', error);
    }
  };

  const handleAddFeature = async () => {
    try {
      await axios.post(`${BackendURL}/add`, {
        cpFeature: newFeature,
        cpFeaturePrice: newFeaturePrice,
      });
      // Fetch the updated list of features after adding a new feature
      fetchData();
      // Clear input fields
      setNewFeature('');
      setNewFeaturePrice('');
    } catch (error) {
      console.error('Error adding feature:', error);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '20px' }}>Feature List</h2>
      <ul>
        {features.map((feature) => (
          <li key={feature._id} style={{ marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold' }}>{feature.cpFeature}</span> - <span>${feature.cpFeaturePrice}</span>
            <button
              style={{
                marginLeft: '10px',
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => handleDelete(feature._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>Add New Feature</h2>
      <div>
        <input
          type="text"
          placeholder="Feature"
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Price"
          value={newFeaturePrice}
          onChange={(e) => setNewFeaturePrice(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          style={{
            padding: '8px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={handleAddFeature}
        >
          Add Feature
        </button>
      </div>
    </div>
  );
};

export default FeatureList;
