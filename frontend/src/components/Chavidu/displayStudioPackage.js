import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../css/chavidu/DisplayStudioPackages.module.css';
import backgroundVideo from "../../images/chavidu/video.mp4"

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
    <div className={styles.studioPackagesContainer}>
      <h2 className={styles.sectionTitle}>Our Packages</h2>
      <div className={styles.videoContainer}>
        <video autoPlay loop muted className={styles.videoBackground}>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={styles.packageList}>
        {packages.map((pkg) => (
          <div key={pkg._id} className={styles.packageCard}>
            <div className={styles.packageHeader}>
              <h3 className={styles.packageName}>{pkg.package}</h3>
              <p className={styles.packageAmount}>Base: RS {pkg.amount}</p>
            </div>
            <p className={styles.packageDescription}>Description: {pkg.description}</p>
            <p className={styles.packagePhotographer}>Photographer: {pkg.photographer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayStudioPackages;
