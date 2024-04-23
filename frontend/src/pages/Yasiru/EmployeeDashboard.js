import React, { useState } from "react";
import EmployeeDashboardSideBar from "../../components/Yasiru/EmplyeeDashboardSideBar";
import '../../CSS/Yasiru/EmpDashbord';
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
                <EmployeeDashboardSideBar onSelectOption={setSelectedOption}/>
            </div>
            <div className="dashboardContent">
                <div className="home">
                    {selectedOption === "home" && <Dashbord/>}
                </div>
                <div className="Employee">
                    {selectedOption === "Employee" && <SaloonEmployeetable />}
                </div>
                <div className="profileLogin">
                    {selectedOption === "profileLogin" && <ProfileLogin/>}
                </div>
                <div className="updateService">
                    {selectedOption === "update-service" && <EmployeeProfile/>}
                </div>
                <div className="viewQuotations">
                    {selectedOption === "quotation-list" && <Attendancecount/>}
                </div>
                {/* <div className="imageUpload">
                    {selectedOption === "image-upload" && <ImageUpload/>}  
                </div> */}
            </div>
        </div>
    )
}