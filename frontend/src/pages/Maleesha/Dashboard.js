import React, { useState } from "react";
import SideBar from '../../components/Maleesha/DashboardSideBar';
import Home from '../../components/Maleesha/DashBoardHome';
import AddService from "../../components/Maleesha/AddService";
import RemoveService from '../../components/Maleesha/DeleteService';
import UpdateService from '../../components/Maleesha/UpdateService';
import '../../css/Maleesha/Dashboard.css';

export default function Dashboard(){

    const [selectedOption, setSelectedOption] = useState('home');

    return(
        <div className="dashboardContainer">
            <div className="sideBar">
                <SideBar onSelectOption={setSelectedOption}/>
            </div>
            <div className="dashboardContent">
                {selectedOption === "home" && <Home/>}
                {selectedOption === "create-service" && <AddService />}
                {selectedOption === "remove-service" && <RemoveService/>}
                {selectedOption === "update-service" && <UpdateService/>} 
            </div>
        </div>
    )
}