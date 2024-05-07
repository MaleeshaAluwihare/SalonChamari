import React, { useState } from "react";
import SideBar from '../../components/Maleesha/DashboardSideBar';
import Home from '../../components/Maleesha/DashBoardHome';
import AddService from "../../components/Maleesha/AddService";
import RemoveService from '../../components/Maleesha/DeleteService';
import UpdateService from '../../components/Maleesha/UpdateService';
import ImageUpload from '../../components/Maleesha/ImageForm';
import Appointments from '../../components/Maleesha/QuotationsAppointments';
import Styles from '../../css/Maleesha/Dashboard.module.css';

export default function Dashboard(){

    const [selectedOption, setSelectedOption] = useState('home');

    return(
        <div className={Styles.dashboardContainer}>
            <div className={Styles.sideBar}>
                <SideBar onSelectOption={setSelectedOption}/>
            </div>
            <div className={Styles.dashboardContent}>
                <div className={Styles.home}>
                    {selectedOption === "home" && <Home/>}
                </div>
                <div className={Styles.createService}>
                    {selectedOption === "create-service" && <AddService />}
                </div>
                <div className={Styles.removeService}>
                    {selectedOption === "remove-service" && <RemoveService/>}
                </div>
                <div className={Styles.updateService}>
                    {selectedOption === "update-service" && <UpdateService/>}
                </div>
                <div className={Styles.viewQuotations}>
                    {selectedOption === "quotation-list" && <Appointments/>}
                </div>
                <div className={Styles.imageUpload}>
                    {selectedOption === "image-upload" && <ImageUpload/>}  
                </div>
            </div>
        </div>
    )
}