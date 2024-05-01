// PackageManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/chavidu/studioPackageAdmin.css';

function PackageList({ packages, onDelete }) {
  return (
    <div className="package-list">
      <h2>Packages</h2>
      <table>
        <thead>
          <tr>
            <th>Package</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Photographer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {packages.map(pkg => (
            <tr key={pkg._id}>
              <td>{pkg.package}</td>
              <td>{pkg.description}</td>
              <td>{pkg.amount}</td>
              <td>{pkg.photographer}</td>
              <td><button onClick={() => onDelete(pkg._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PackageManagement() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get("/StudioAdmin/packages");
      setPackages(response.data);
    } catch (error) {
      console.log("Error fetching packages:", error);
    }
  };

  const handleDeletePackage = async (id) => {
    try {
      await axios.delete(`/StudioAdmin/packages/${id}`);
      fetchPackages();
    } catch (error) {
      console.log("Error deleting package:", error);
    }
  };

  return (
    <div className="package-management">
      <h1>Package Management</h1>
      <PackageList packages={packages} onDelete={handleDeletePackage} />
    </div>
  );
}

export default PackageManagement;
