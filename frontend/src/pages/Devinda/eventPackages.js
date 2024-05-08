import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import styles from "../../css/Devinda/packages.module.css"; // Import your CSS module

export const EventPackages = () => {
  const [packages, setPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:8070/eventPackages").then((response) => {
      setPackages(response.data);
    });
  }, []);

  const setPackage = (_id, pFeatures, pName, pPrice) => {
    localStorage.setItem("pFeatures", pFeatures);
    localStorage.setItem("pName", pName);
    localStorage.setItem("pPrice", pPrice);
    localStorage.setItem("ID", _id);
  };

  // Function to handle changes in the search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter packages
  const filteredPackages = packages.filter((eventPackage) => {
    // Check if features include search query
    return eventPackage.pFeatures.some((feature) =>
      feature.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Array of image URLs
  const imageUrls = [
    require("../../images/chavidu/eventImage1.jpg"),
    require("../../images/chavidu/eventImage2.jpg"),
    require("../../images/chavidu/eventImage3.jpg"),
    require("../../images/chavidu/eventImage4.jpg"),
    require("../../images/chavidu/eventImage5.jpg"),
  ];

  // Function to advance to the next image in the slideshow
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Automatically advance to the next image every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Slideshow */}
      <div className={styles.slideshowContainer}>
        <img
          src={imageUrls[currentImageIndex]}
          alt={`Slide ${currentImageIndex + 1}`}
          className={`${styles.slide} ${styles.fade}`}
        />
      </div>

      {/* Text container */}
      <div className={styles.textContainer}>
        <div className={styles.row}>
          <div className={styles.column}>
            <h3 className={styles.animatedText}>
              Step into our world of Events with boundless creativity.
            </h3>
          </div>
        </div>
      </div>

      {/* Packages container */}
      <div className={styles.packagesContainer}>
        {/* Search container */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by the feature name"
            value={searchQuery}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          {/* Display filtered packages */}
          {filteredPackages.map((eventPackage) => (
            <div key={eventPackage._id} className={styles.packageItem}>
              <div
                onClick={() =>
                  setPackage(
                    eventPackage._id,
                    eventPackage.pFeatures,
                    eventPackage.pName,
                    eventPackage.pPrice
                  )
                }
              >
                <h1 className={styles.packageName}>{eventPackage.pName}</h1>

                {eventPackage.pFeatures.map((feature, index) => (
                  <p key={index} className={styles.packageFeature}>
                    {feature}
                  </p>
                ))}
                <h2 className={styles.packagePrice}>{eventPackage.pPrice}</h2>
                <Link to={`/eventForm`} className={styles.purchaseLink}>
                  <button className={styles.purchaseButton}>Purchase</button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Customize button */}
        <div className={styles.customizeButtonContainer}>
          <Link to={`/customEventPackage`} className={styles.customizeLink}>
            <button className={styles.customizeButton}>
              Customize package
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default EventPackages;
