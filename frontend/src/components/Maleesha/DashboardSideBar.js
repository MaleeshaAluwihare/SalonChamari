import React, { useState } from "react";
import '../../css/Maleesha/DashboardSideBar.css';
import Logo from '../../images/Maleesha/Logo.png';

export default function DashboardSideBar({ onSelectOption }) {

  const [selectedOption, setSelectedOption] = useState('home');

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <img src={Logo} alt="Salon Logo" className="logo" />
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
                Home
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "create-service" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("create-service");
                  setSelectedOption("create-service");
                }}
              >
                Create Service
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "remove-service" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("remove-service");
                  setSelectedOption("remove-service");
                }}
              >
                Remove Service
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "update-service" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("update-service");
                  setSelectedOption("update-service");
                }}
              >
                Update Service
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "quotation-list" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("quotation-list");
                  setSelectedOption("quotation-list");
                }}
              >
                View Quotations
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
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
