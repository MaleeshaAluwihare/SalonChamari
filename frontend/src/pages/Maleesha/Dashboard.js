import React, { useState } from "react";
import SideBar from '../../components/Maleesha/DashboardSideBar';
import Home from '../../components/Maleesha/DashBoardHome';
import AddService from "../../components/Maleesha/AddService";
import RemoveService from '../../components/Maleesha/DeleteService';
import UpdateService from '../../components/Maleesha/UpdateService';
import ImageUpload from '../../components/Maleesha/ImageForm';
import '../../css/Maleesha/Dashboard.css';

export default function Dashboard(){

    const [selectedOption, setSelectedOption] = useState('home');

    return(
        <div className="dashboardContainer">
            <div className="sideBar">
                <SideBar onSelectOption={setSelectedOption}/>
            </div>
            <div className="dashboardContent">
                <div className="home">
                    {selectedOption === "home" && <Home/>}
                </div>
                <div className="createService">
                    {selectedOption === "create-service" && <AddService />}
                </div>
                <div className="removeService">
                    {selectedOption === "remove-service" && <RemoveService/>}
                </div>
                <div className="updateService">
                    {selectedOption === "update-service" && <UpdateService/>}
                </div>
                <div className="imageUpload">
                    {selectedOption === "image-upload" && <ImageUpload/>}  
                </div>
            </div>
        </div>
    )
}