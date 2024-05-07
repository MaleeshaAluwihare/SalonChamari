import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload ,faHouse, faCirclePlus, faTrash, faFilePen, faEye, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../images/Maleesha/Logo.png';
import Styles from '../../css/Maleesha/DashboardSideBar.module.css';

export default function DashboardSideBar({ onSelectOption }) {

  const [selectedOption, setSelectedOption] = useState('home');

  return (
    <div className={Styles.dashboardContainer}>
      <div className={Styles.sidebar}>
        <div className={Styles.sidebarHeader}>
          <div className={Styles.logoContainer}>
            <img src={Logo} alt="Salon Logo" className={Styles.logo} />
          </div>
          <h1 className={Styles.salonName}>Salon Chamari</h1>
          <div className={Styles.dashboardTitle}>
            <h2 className={Styles.dashboardHeading}>Service Dashboard</h2>
            <hr className={Styles.dashboardDivider} />
          </div>
        </div>
        <nav className={Styles.sidebarNav}>
          <ul className={Styles.navList}>
            <li className={Styles.navItem}>
              <button
                className={`${Styles.navButton} ${selectedOption === "home" ? Styles.active : ""}`}
                onClick={() => {
                  onSelectOption("home");
                  setSelectedOption("home");
                }}
              >
                <FontAwesomeIcon icon={faHouse} className={Styles.buttonIcon} />Home
              </button>
            </li>
            <li className={Styles.navItem}>
              <button
                className={`${Styles.navButton} ${selectedOption === "create-service" ? Styles.active : ""}`}
                onClick={() => {
                  onSelectOption("create-service");
                  setSelectedOption("create-service");
                }}
              >
                <FontAwesomeIcon icon={faCirclePlus} className={Styles.buttonIcon} />Create Service
              </button>
            </li>
            <li className={Styles.navItem}>
              <button
                className={`${Styles.navButton} ${selectedOption === "remove-service" ? Styles.active : ""}`}
                onClick={() => {
                  onSelectOption("remove-service");
                  setSelectedOption("remove-service");
                }}
              >
                <FontAwesomeIcon icon={faTrash} className={Styles.buttonIcon} />Remove Service
              </button>
            </li>
            <li className={Styles.navItem}>
              <button
                className={`${Styles.navButton} ${selectedOption === "update-service" ? Styles.active : ""}`}
                onClick={() => {
                  onSelectOption("update-service");
                  setSelectedOption("update-service");
                }}
              >
                <FontAwesomeIcon icon={faFilePen} className={Styles.buttonIcon} />Update Service
              </button>
            </li>
            <li className={Styles.navItem}>
              <button
                className={`${Styles.navButton} ${selectedOption === "quotation-list" ? Styles.active : ""}`}
                onClick={() => {
                  onSelectOption("quotation-list");
                  setSelectedOption("quotation-list");
                }}
              >
                <FontAwesomeIcon icon={faEye} className={Styles.buttonIcon} />View Quotations
              </button>
            </li>
            <li className={Styles.navItem}>
              <button
                className={`${Styles.navButton} ${selectedOption === "image-upload" ? Styles.active : ""}`}
                onClick={() => {
                  onSelectOption("image-upload");
                  setSelectedOption("image-upload");
                }}
              >
                <FontAwesomeIcon icon={faUpload} className={Styles.buttonIcon} />Add Accessories
              </button>
            </li>
            <li className={Styles.navItem}>
              <button
                className={`${Styles.navButton} ${selectedOption === "logout" ? Styles.active : ""}`}
                onClick={() => {
                  onSelectOption("logout");
                  setSelectedOption("logout");
                }}
              >
                <FontAwesomeIcon icon={faRightFromBracket} className={Styles.buttonIcon} />Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
