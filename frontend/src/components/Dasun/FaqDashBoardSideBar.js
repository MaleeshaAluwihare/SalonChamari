import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload ,faHouse, faCirclePlus, faTrash, faFilePen, faEye, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import '../../CSS/Dasun/faqDashBoardSideBar.css';
import Logo from '../../images/Dasun/Logo.png';

export default function FaqDashboardSideBar({ onSelectOption }) {

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
                className={`nav-button ${selectedOption === "all_faqs" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("all_faqs");
                  setSelectedOption("all_faqs");
                }}
              >
                <FontAwesomeIcon icon={faHouse} className="button-icon" />FAQs
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "add_faqs" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("add_faqs");
                  setSelectedOption("add_faqs");
                }}
              >
                <FontAwesomeIcon icon={faCirclePlus} className="button-icon" />Add FAQ
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "all_blogs" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("all_blogs");
                  setSelectedOption("all_blogs");
                }}
              >
                <FontAwesomeIcon icon={faTrash} className="button-icon" />Blogs
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "add_blog" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("add_blog");
                  setSelectedOption("add_blog");
                }}
              >
                <FontAwesomeIcon icon={faFilePen} className="add_blog" />Add Blog
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "all_feedbacks" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("all_feedbacks");
                  setSelectedOption("all_feedbacks");
                }}
              >
                <FontAwesomeIcon icon={faEye} className="button-icon" />Feedbacks
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-button ${selectedOption === "all_messages" ? "active" : ""}`}
                onClick={() => {
                  onSelectOption("all_messages");
                  setSelectedOption("all_messages");
                }}
              >
                <FontAwesomeIcon icon={faUpload} className="button-icon" />Messages
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