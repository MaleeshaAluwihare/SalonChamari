import React, { useState } from "react";
import EmployeeDashboardSideBar from "../../components/Yasiru/EmpDashboardSideBar";
import styles from'../../css/Yasiru/EmpDashboardStyle.module.css'
import SaloonEmployeetable from "./SaloonEmployeetable";
import ProfileLogin from "./Profileloging";
import EmployeeProfile from "./EmployeeProfile";
import Attendancecount from "./Attendancecount";
import Home from "./Home";
import Leavedetails from "./Leavedetails";

export default function Dashboard(){

    const [selectedOption, setSelectedOption] = useState('home');

    return(
        <div className={styles["dashboardContainer"]}>
            <div className={styles["sideBar"]}>
                <EmployeeDashboardSideBar onSelectOption={setSelectedOption}/>
            </div>
            <div className={styles["dashboardContent"]}>
                <div className={styles["home"]}>
                    {selectedOption === "home" && <Home/>}
                </div>
                <div className={styles["Employee"]}>
                    {selectedOption === "Employee" && <SaloonEmployeetable/>}
                </div>
                <div className={styles["profileLogin"]}>
                    {selectedOption === "profileLogin" && <ProfileLogin/>}
                </div>
                <div className={styles["empProfile"]}>
                    {selectedOption === "empProfile" && <EmployeeProfile/>}
                </div>
                <div className={styles["attendance"]}>
                    {selectedOption === "attendance" && <Attendancecount/>}
                </div>
                <div className={styles["Leave"]}>
                    {selectedOption === "Leave" && <Leavedetails/>}
                </div>
                {/* <div className={styles["imageUpload"]}>
                    {selectedOption === "image-upload" && <ImageUpload/>}  
                </div> */}
            </div>
        </div>
    )
}
