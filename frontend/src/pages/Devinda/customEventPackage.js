import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function EventCustomization() {

  const navigation = useNavigate()
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8070/eCPackage/');
      if (!response.ok) {
        throw new Error('Failed to fetch features');
      }
      const data = await response.json();
      console.log('Fetched features:', data); // Log fetched data
      setFeatures(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCheckboxChange = (feature) => {
    const isSelected = selectedFeatures.includes(feature);
    let updatedSelectedFeatures;

    if (isSelected) {
      updatedSelectedFeatures = selectedFeatures.filter((item) => item !== feature);
    } else {
      updatedSelectedFeatures = [...selectedFeatures, feature];
    }

    setSelectedFeatures(updatedSelectedFeatures);
    calculateTotal(updatedSelectedFeatures);
  };

  const calculateTotal = (selectedFeatures) => {
    let total = 0;
    selectedFeatures.forEach(feature => {
      total += parseFloat(feature.cpFeaturePrice);
    });
    setTotalPrice(total);
  };

  const handleProceed = () => {
    // Save selected features to local storage
    localStorage.setItem("selectedFeatures", JSON.stringify(selectedFeatures));
    localStorage.setItem("customEventTotalPrice", totalPrice);

    // Log selectedFeatures before navigating
    const storedSelectedFeatures = JSON.parse(localStorage.getItem("selectedFeatures"));
    console.log("Selected Features stored in local storage:", storedSelectedFeatures);

    // Navigate to the next page
    navigation('/customEventForm');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Event Customization</h1>
      {features.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Feature</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Price</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Select</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{feature.cpFeature}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{feature.cpFeaturePrice}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature)}
                    onChange={() => handleCheckboxChange(feature)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p style={{ textAlign: 'center', marginTop: '20px' }}>Total Price: {parseFloat(totalPrice).toFixed(2)}</p>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={handleProceed}>Proceed</button>
      </div>
    </div>
  );
}

export default EventCustomization;
