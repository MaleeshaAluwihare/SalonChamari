import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload ,faHouse, faCirclePlus, faTrash, faFilePen, faEye, faRightFromBracket, faChartLine } from '@fortawesome/free-solid-svg-icons';

import Logo from '../../images/chavidu/studioLogo.png';
import PackageManagement from './studioPackageAdmin';
import styles from '../../css/chavidu/adminDashBoardSideBar.module.css';

export default function DashboardSideBar({ onSelectOption }) {

  const [selectedOption, setSelectedOption] = useState('home');

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <img src={Logo} alt="Salon Logo" className="logo" />
          </div>
          <h1 className="salon-name">Nishan Studio</h1>
          <div className="dashboard-title">
            <h2 className="dashboard-heading">Service Dashboard</h2>
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
                className={`nav-button ${selectedOption === "create-package" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("create-package");
                  setSelectedOption("create-package");
                }}
              >
                <FontAwesomeIcon icon={faCirclePlus} className="button-icon" />Create Package
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "edit-package" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("edit-package");
                  setSelectedOption("edit-package");
                }}
              >
                <FontAwesomeIcon icon={faFilePen} className="button-icon" />Edit Package
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "charts" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("charts");
                  setSelectedOption("charts");
                }}
              >
                <FontAwesomeIcon icon={faChartLine} className="button-icon" />View Reports
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "list" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("list");
                  setSelectedOption("list");
                }}
              >
                <FontAwesomeIcon icon={faTrash} className="button-icon" />Delete Packages
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