// PackageManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../css/chavidu/studioPackageAdmin.module.css';

function PackageList({ packages, onDelete }) {
  return (
    <div className={styles.packageList}>
      <h2>Packages</h2>
      <table>
        <thead>
          <tr>
            <th className={styles.packageTableHeader}>Package</th>
            <th className={styles.packageTableHeader}>Description</th>
            <th className={styles.packageTableHeader}>Amount</th>
            <th className={styles.packageTableHeader}>Photographer</th>
            <th className={styles.packageTableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {packages.map(pkg => (
            <tr key={pkg._id}>
              <td>{pkg.package}</td>
              <td>{pkg.description}</td>
              <td>{pkg.amount}</td>
              <td>{pkg.photographer}</td>
              <td><button className={styles.deleteButton} onClick={() => onDelete(pkg._id)}>Delete</button></td>
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
    <div className={styles.packageManagement}>
      <h1>Package Management</h1>
      <PackageList packages={packages} onDelete={handleDeletePackage} />
    </div>
  );
}

export default PackageManagement;
