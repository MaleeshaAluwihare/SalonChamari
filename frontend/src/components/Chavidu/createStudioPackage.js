import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../css/chavidu/createSalonPackage.module.css'; // Import CSS module

function PackageForm() {
  const [formData, setFormData] = useState({
    package: '',
    description: '',
    amount: '',
    photographer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Validate photographer name to not include numbers
    if (name === 'photographer') {
      newValue = value.replace(/[0-9]/g, ''); // Remove any numbers
    }

    // // Validate package name to only contain letters or numbers
    // if (name === 'package') {
    //   newValue = value.replace(/[^a-zA-Z0-9]/g, ''); // Remove any characters other than letters or numbers
    // }

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/StudioAdmin/addPackage", formData);
      console.log("Package added successfully:", formData);
      setFormData({
        package: '',
        description: '',
        amount: '',
        photographer: ''
      });
    } catch (error) {
      console.log("Error adding package:", error);
    }
  };

  return (
    <div className={styles.packageFormContainer}>
      <div className={styles.packageForm}>
        <h2>Create New Package</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Package:
            <input type="text" name="package" value={formData.package} onChange={handleChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </label>
          <label>
            Amount:
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
          </label>
          <label>
            Photographer:
            <input type="text" name="photographer" value={formData.photographer} onChange={handleChange} />
          </label>
          <button type="submit" className={styles.button24}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default PackageForm;
