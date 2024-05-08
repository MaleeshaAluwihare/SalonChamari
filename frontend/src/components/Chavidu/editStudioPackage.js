// EditPackage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../css/chavidu/editSalonpackage.module.css'; // Import CSS module

function EditPackage({ onClose }) {
  const [packageNames, setPackageNames] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(''); // Ensure selectedPackage is initialized to an empty string
  const [formData, setFormData] = useState({
    packageName: '',
    amount: '',
    photographer: '',
    description: ''
  });

  useEffect(() => {
    fetchPackageNames();
  }, []);

  const fetchPackageNames = async () => {
    try {
      const response = await axios.get('/StudioAdmin/packageNames');
      setPackageNames(response.data);
    } catch (error) {
      console.log("Error fetching package names:", error);
    }
  };

  const fetchPackageDetails = async (packageName) => {
    try {
      const response = await axios.get(`/StudioAdmin/packages?packageName=${packageName}`);
      const { amount, photographer, description } = response.data[0];
      setFormData(prevState => ({
        ...prevState,
        packageName, // Update packageName in formData
        amount,
        photographer,
        description
      }));
    } catch (error) {
      console.log("Error fetching package details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePackageChange = (e) => {
    const { value } = e.target;
    setSelectedPackage(value);
    fetchPackageDetails(value); // Fetch package details when package is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/StudioAdmin/packages/${selectedPackage}`, formData);
      console.log("Package updated successfully:", formData);
      onClose();
    } catch (error) {
      console.log("Error updating package:", error);
    }
  };

  return (
    <div className={styles.editPackage}>
      <h2>Edit Package</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Package:
          <select value={selectedPackage} onChange={handlePackageChange}>
            <option value="">Select a package</option>
            {packageNames.map((packageObj, index) => (
              <option key={index} value={packageObj.package}>{packageObj.package}</option>
            ))}
          </select>
        </label>
        <label>
          Amount:
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
        </label>
        <label>
          Photographer:
          <input type="text" name="photographer" value={formData.photographer} onChange={handleChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </label>
        <div className={styles.editPackageButtons}>
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditPackage;
