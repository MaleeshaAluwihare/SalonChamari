// PackageForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../css/chavidu/createSalonPackage.css';

function PackageForm() {
  const [formData, setFormData] = useState({
    package: '',
    description: '', // Added description field
    amount: '',
    photographer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/StudioAdmin/addPackage", formData);
      console.log("Package added successfully:", formData);
      setFormData({
        package: '',
        description: '', // Reset description field
        amount: '',
        photographer: ''
      });
    } catch (error) {
      console.log("Error adding package:", error);
    }
  };

  return (
    <div className="package-form-container">
      <div className="package-form">
        <h2>Create New Package</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Package:
            <input type="text" name="package" value={formData.package} onChange={handleChange} />
          </label>
          <label>
            Description: {/* Added description input */}
            <input type="text" name="description" value={formData.description} onChange={handleChange} />
          </label>
          <label>
            Amount:
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
          </label>
          <label>
            Photographer:
            <input type="text" name="photographer" value={formData.photographer} onChange={handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default PackageForm;
