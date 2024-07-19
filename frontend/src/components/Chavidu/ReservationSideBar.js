import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload ,faHouse, faCirclePlus, faTrash, faFilePen, faEye, faRightFromBracket, faChartLine } from '@fortawesome/free-solid-svg-icons';
import styles from '../../css/chavidu/adminDashBoardSideBar.module.css';
// import Logo from '../../images/Maleesha/Logo.png';
import PackageManagement from './studioPackageAdmin';

export default function ReservationSideBar({ onSelectOption }) {

  const [selectedOption, setSelectedOption] = useState('home');

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            {/* <img src={Logo} alt="Salon Logo" className="logo" /> */}
          </div>
          <h1 className="salon-name"></h1>
          <div className="dashboard-title">
            <h2 className="dashboard-heading">Reservation Management</h2>
            <hr className="dashboard-divider" />
          </div>
        </div>
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "home" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("home");
                  setSelectedOption("home");
                }}
              >
                <FontAwesomeIcon icon={faHouse} className="button-icon" />Home
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "Salon-Reservations" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("Salon-Reservations");
                  setSelectedOption("Salon-Reservations");
                }}
              >
                <FontAwesomeIcon icon={faFilePen} className="button-icon" />Salon Reservations
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "Studio-Reservations" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("Studio-Reservations");
                  setSelectedOption("Studio-Reservations");
                }}
              >
                <FontAwesomeIcon icon={faFilePen} className="button-icon" />Studio Reservations
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "Studio-Analytics" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("Studio-Analytics");
                  setSelectedOption("Studio-Analytics");
                }}
              >
                <FontAwesomeIcon icon={faChartLine} className="button-icon" />Studio Analytics
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "logout" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("logout");
                  setSelectedOption("logout");
                }}
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="button-icon" />Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}