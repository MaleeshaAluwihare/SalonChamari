import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faHouse, faCartPlus, faPenToSquare, faFilePen, faBoxesStacked, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from '../../css/Anoj/InventoryDashboradSideBar.module.css';

export default function DashboardSideBar({ onSelectOption }) {
  const [selectedOption, setSelectedOption] = useState('home');

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoContainer}>
            {/* Logo goes here */}
          </div>
          <h1 className={styles.salonName}>Inventory Managements</h1>
          <div className={styles.dashboardTitle}>
            <h2 className={styles.dashboardHeading}>Inventory Dashboard</h2>
            <hr className={styles.dashboardDivider} />
          </div>
        </div>
        <nav className={styles.sidebarNav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <button
                className={`${styles.navButton} ${selectedOption === "home" ? styles.active : ""}`}
                onClick={() => {
                  onSelectOption("home");
                  setSelectedOption("home");
                }}
              >
                <FontAwesomeIcon icon={faHouse} className={styles.buttonIcon} />Home
              </button>
            </li>
            <li className={styles.navItem}>
              <button
                className={`${styles.navButton} ${selectedOption === "create-stock" ? styles.active : ""}`}
                onClick={() => {
                  onSelectOption("create-stock");
                  setSelectedOption("create-stock");
                }}
              >
                <FontAwesomeIcon icon={faCartPlus} className={styles.buttonIcon} /> Add stock
              </button>
            </li>
            <li className={styles.navItem}>
              <button
                className={`${styles.navButton} ${selectedOption === "update-stock" ? styles.active : ""}`}
                onClick={() => {
                  onSelectOption("update-stock");
                  setSelectedOption("update-stock");
                }}
              >
                <FontAwesomeIcon icon={faPenToSquare} className={styles.buttonIcon} />Update stock
              </button>
            </li>
            <li className={styles.navItem}>
              <button
                className={`${styles.navButton} ${selectedOption === "reorder-stock" ? styles.active : ""}`}
                onClick={() => {
                  onSelectOption("reorder-stock");
                  setSelectedOption("reorder-stock");
                }}
              >
                <FontAwesomeIcon icon={faFilePen} className={styles.buttonIcon} />Re-Order Stock
              </button>
            </li>
            <li className={styles.navItem}>
              <button
                className={`${styles.navButton} ${selectedOption === "stock-list" ? styles.active : ""}`}
                onClick={() => {
                  onSelectOption("stock-list");
                  setSelectedOption("quotation-list");
                }}
              >
                <FontAwesomeIcon icon={faBoxesStacked} className={styles.buttonIcon} />Stocks
              </button>
            </li>
            <li className={styles.navItem}>
              <button
                className={`${styles.navButton} ${selectedOption === "stock-order" ? styles.active : ""}`}
                onClick={() => {
                  onSelectOption("stock-order");
                  setSelectedOption("stock-order");
                }}
              >
                <FontAwesomeIcon icon={faUpload} className={styles.buttonIcon} />Order
              </button>
            </li>
            <li className={styles.navItem}>
              <button
                className={`${styles.navButton} ${selectedOption === "logout" ? styles.active : ""}`}
                onClick={() => {
                  onSelectOption("logout");
                  setSelectedOption("logout");
                }}
              >
                <FontAwesomeIcon icon={faRightFromBracket} className={styles.buttonIcon} />Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}