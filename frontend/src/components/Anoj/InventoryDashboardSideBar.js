import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faHouse, faCartPlus, faPenToSquare, faFilePen, faBoxesStacked, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from '../../css/Anoj/InventoryDashboradSideBar.module.css';

export default function DashboardSideBar({ onSelectOption }) {
  const [selectedOption, setSelectedOption] = useState('home');

  return (
    <div className={styles.dashboardContainer1}>
      <div className={styles.sidebar1}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoContainer}>
            {/* Logo goes here */}
          </div>
          <h1 className={styles.salonName1}>Inventory Managements</h1>
          <div className={styles.dashboardTitle1}>
            <h2 className={styles.dashboardHeading1}>Inventory Dashboard</h2>
            <hr className={styles.dashboardDivider1} />
          </div>
        </div>
        <nav className={styles.sidebarNav1}>
          <ul className={styles.navList1}>
            <li className={styles.navItem1}>
              <button
                className={`${styles.navButton1} ${selectedOption === "home" ? styles.active : ""}`}
                onClick={() => {
                  onSelectOption("home");
                  setSelectedOption("home");
                }}
              >
                <FontAwesomeIcon icon={faHouse} className={styles.buttonIcon1} />Home
              </button>
            </li>
            <li className={styles.navItem1}>
              <button
                className={`${styles.navButton1} ${selectedOption === "create-stock" ? styles.active : ""}`}
                onClick={() => {
                  onSelectOption("create-stock");
                  setSelectedOption("create-stock");
                }}
              >
                <FontAwesomeIcon icon={faCartPlus} className={styles.buttonIcon1} /> Add stock
              </button>
            </li>
            <li className={styles.navItem1}>
              <button
                className={`${styles.navButton1} ${selectedOption === "reorder-stock" ? styles.active : ""}`}
                onClick={() => {
                  onSelectOption("reorder-stock");
                  setSelectedOption("reorder-stock");
                }}
              >
                <FontAwesomeIcon icon={faFilePen} className={styles.buttonIcon1} />Re-Order Stock
              </button>
            </li>
            <li className={styles.navItem1}>
              <button
                className={`${styles.navButton1} ${selectedOption === "stock-list" ? styles.active : ""}`}
                onClick={() => {
                  onSelectOption("stock-list");
                  setSelectedOption("quotation-list");
                }}
              >
                <FontAwesomeIcon icon={faBoxesStacked} className={styles.buttonIcon1} />Stocks
              </button>
            </li>
            <li className={styles.navItem1}>
              <button
                className={`${styles.navButton1} ${selectedOption === "stock-order" ? styles.active : ""}`}
                onClick={() => {
                  onSelectOption("stock-order");
                  setSelectedOption("stock-order");
                }}
              >
                <FontAwesomeIcon icon={faUpload} className={styles.buttonIcon1} />Order
              </button>
            </li>
            <li className={styles.navItem1}>
              <button
                className={`${styles.navButton1} ${selectedOption === "logout" ? styles.active : ""}`}
                onClick={() => {
                  onSelectOption("logout");
                  setSelectedOption("logout");
                }}
              >
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}