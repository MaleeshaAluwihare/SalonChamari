import React, { useState } from "react";
import EmpDashboardSideBar from "../../components/Yasiru/EmpDashboardSideBar"
import '../../CSS/Yasiru/EmpDashboard.css'
import Dashbord from "../Dashbord";
import SaloonEmployeetable from "./SaloonEmployeetable";
import ProfileLogin from "./Profileloging";
import EmployeeProfile from "./EmployeeProfile";
import Attendancecount from "./Attendancecount";

export default function Dashboard(){

    const [selectedOption, setSelectedOption] = useState('home');

    return(
        <div className="dashboardContainer">
            <div className="sideBar">
                <EmpDashboardSideBar onSelectOption={setSelectedOption}/>
            </div>
            <div className="dashboardContent">
                <div className="home">
                    {selectedOption === "home" && <Dashbord/>}
                </div>
                <div className="createService">
                    {selectedOption === "create-stock" && <SaloonEmployeetable/>}
                </div>
                <div className="update-stock">
                    {selectedOption === "update-stock" && <ProfileLogin/>}
                </div>
                <div className="reorder-stock">
                    {selectedOption === "reorder-stock" &&  <EmployeeProfile/>}
                </div>
                <div className="stock-list">
                    {selectedOption === "stock-list" && <Attendancecount/>}
                </div>
                {/* <div className="imageUpload">
                    {selectedOption === "image-upload" && <ImageUpload/>}  
                </div> */}
            </div>
        </div>
    )
}