// EmployeeDashboardSideBar.js
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCirclePlus, faTrash, faFilePen, faEye } from '@fortawesome/free-solid-svg-icons';
import style from'../../css/Yasiru/EmpDashboardSideBarStyle.module.css';

export default function EmployeeDashboardSideBar({ onSelectOption }) {
  const [selectedOption, setSelectedOption] = useState('home');

  return (
    <div className={style["dashboard-container"]}>
      <div className={style["sidebar"]}>
        <div className={style["sidebar-header"]}>
          <h1 className={style["salon-name"]}>Employee Managements</h1>
          <div className={style["dashboard-title"]}>
            <h2 className={style["dashboard-heading"]}>Service Dashboard</h2>
            <hr className={style["dashboard-divider"]} />
          </div>
        </div>
        <nav className={style["sidebar-nav"]}>
          <ul className={style["nav-list"]}>
            <li className={style["nav-item"]}>
              <button
                className={`${style["nav-button"]} ${selectedOption === "home" ? style["active"] : ""}`}
                onClick={() => {
                  onSelectOption("home");
                  setSelectedOption("home");
                }}
              >
                <FontAwesomeIcon icon={faHouse} className={style["button-icon"]} />Home
              </button>
            </li>
            <li className={style["nav-item"]}>
              <button
                className={`${style["nav-button"]} ${selectedOption === "Employee" ? style["active"] : ""}`}
                onClick={() => {
                  onSelectOption("Employee");
                  setSelectedOption("Employee");
                }}
              >
                <FontAwesomeIcon icon={faCirclePlus} className={style["button-icon"]} /> Employee
              </button>
            </li>

            
            
            
            <li className={style["nav-item"]}>
              <button
                className={`${style["nav-button"]} ${selectedOption === "attendance" ? style["active"] : ""}`}
                onClick={() => {
                  onSelectOption("attendance");
                  setSelectedOption("attendance");
                }}
              >
                <FontAwesomeIcon icon={faEye} className={style["button-icon"]} />Attendance
              </button>
            </li>

            <li className={style["nav-item"]}>
              <button
                className={`${style["nav-button"]} ${selectedOption === "Leave" ? style["active"] : ""}`}
                onClick={() => {
                  onSelectOption("Leave");
                  setSelectedOption("Leave");
                }}
              >
                <FontAwesomeIcon icon={faEye} className={style["button-icon"]} />Leavedetails
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
