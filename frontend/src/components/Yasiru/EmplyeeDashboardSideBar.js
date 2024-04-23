import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload ,faHouse, faCirclePlus, faTrash, faFilePen, faEye, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import '../../CSS/Yasiru/EmpDashbordSideBar.css';


export default function EmployeeDashboardSideBar({ onSelectOption }) {

  const [selectedOption, setSelectedOption] = useState('home');

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
          </div>
          <h1 className="salon-name">Salon Chamari</h1>
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
                className={`nav-button ${selectedOption === "Employee" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("Employee");
                  setSelectedOption("Employee");
                }}
              >
                <FontAwesomeIcon icon={faCirclePlus} className="button-icon" /> Employee
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "profileLogin" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("profileLogin");
                  setSelectedOption("profileLogin");
                }}
              >
                <FontAwesomeIcon icon={faTrash} className="button-icon" />Profile Login
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "profile" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("profile");
                  setSelectedOption("profile");
                }}
              >
                <FontAwesomeIcon icon={faFilePen} className="button-icon" />Profile
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "Attendance" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("Attendance");
                  setSelectedOption("Attendance");
                }}
              >
                <FontAwesomeIcon icon={faEye} className="button-icon" />Attendance
              </button>
            </li>
            {/* <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "image-upload" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("image-upload");
                  setSelectedOption("image-upload");
                }}
              >
                <FontAwesomeIcon icon={faUpload} className="button-icon" />Add Accessories
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
            </li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
}