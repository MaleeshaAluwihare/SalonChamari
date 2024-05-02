import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload ,faHouse, faCirclePlus, faTrash, faFilePen, faEye, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import '../../css/Anoj/InventoryDashboradSideBar.css';
// import Logo from '../../images/Maleesha/Logo.png'; 



export default function DashboardSideBar({ onSelectOption }) {

  const [selectedOption, setSelectedOption] = useState('home');

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            
          </div>
          <h1 className="salon-name">Inventory Managements</h1>
          <div className="dashboard-title">
            <h2 className="dashboard-heading">Inventory Dashboard</h2>
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
                className={`nav-button ${selectedOption === "create-stock" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("create-stock");
                  setSelectedOption("create-stock");
                }}
              >
                <FontAwesomeIcon icon={faCirclePlus} className="button-icon" /> Add stock
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "update-stock" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("update-stock");
                  setSelectedOption("update-stock");
                }}
              >
                <FontAwesomeIcon icon={faTrash} className="button-icon" />Update stock
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "reorder-stock" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("reorder-stock");
                  setSelectedOption("reorder-stock");
                }}
              >
                <FontAwesomeIcon icon={faFilePen} className="button-icon" />Re-Order Stock
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "stock-list" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("stock-list");
                  setSelectedOption("quotation-list");
                }}
              >
                <FontAwesomeIcon icon={faEye} className="button-icon" />Stocks
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "image-upload" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("image-upload");
                  setSelectedOption("image-upload");
                }}
              >
                <FontAwesomeIcon icon={faUpload} className="button-icon" />Order
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