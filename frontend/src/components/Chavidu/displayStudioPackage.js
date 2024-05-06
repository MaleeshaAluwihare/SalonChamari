import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/chavidu/DisplayStudioPackages.css';

const DisplayStudioPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Fetch all studio packages when the component mounts
    const fetchPackages = async () => {
      try {
        const response = await axios.get('/StudioAdmin/packages');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="studio-packages-container">
      <h2 className="section-title">Studio Packages</h2>
      <div className="package-list">
        {packages.map((pkg) => (
          <div key={pkg._id} className="package-card">
            <div className="package-header">
              <h3 className="package-name">{pkg.package}</h3>
              <p className="package-amount">Amount: {pkg.amount}</p>
            </div>
            <p className="package-description">Description: {pkg.description}</p>
            <p className="package-photographer">Photographer: {pkg.photographer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayStudioPackages;
