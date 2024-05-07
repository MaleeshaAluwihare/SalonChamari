import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import image from "../../images/image02.jpg";
import styles from "../../css/Devinda/packages.module.css"; // Import your CSS module

export const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:8070/eventPackages").then((getPackages) => {
      setPackages(getPackages.data);
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
    // Check if features 
    return eventPackage.pFeatures.some((feature) =>
      feature.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <div className={styles.packagesContainer} style={{ backgroundImage: `url(${image})` }}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by the feature name"
            value={searchQuery}
            onChange={handleSearch}
            className={styles.searchInput}
          />
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
                  <p key={index} className={styles.packageFeature}>{feature}</p>
                ))}
                <h2 className={styles.packagePrice}>{eventPackage.pPrice}</h2>
                <Link to={`/eventForm`} className={styles.purchaseLink} style={{ textDecoration: "none" }}>
                  <button className={styles.purchaseButton}>
                    Purchase
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.customizeButtonContainer}>
          <Link to={`/customEventPackage`} className={styles.customizeLink} style={{ textDecoration: "none" }}>
            <button className={styles.customizeButton}>
              Customize package
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
