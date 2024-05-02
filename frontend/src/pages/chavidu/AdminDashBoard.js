import React, { useState } from "react";

import PackageManagement from '../../components/Chavidu/studioPackageAdmin';
import PeakBookingDaysChart from '../../components/Chavidu/bookingDataChart';
import StudioImageUploader from '../../components/Chavidu/studioImageForm';
import ImageDisplay from '../../components/Chavidu/displayPackageImages';
import PackageForm from '../../components/Chavidu/createStudioPackage';
import EditPackage from '../../components/Chavidu/editStudioPackage';
import SideBar from '../../components/Chavidu/AdminSideBar';
import ViewStudioBookings from '../../components/Chavidu/ViewStudioBookings';

import '../../css/chavidu/DashBoard.css';

export default function Dashboard(){

    const [selectedOption, setSelectedOption] = useState('home');

    return(
        <div className="dashboardContainer">
            <div className="sideBar">
                <SideBar onSelectOption={setSelectedOption}/>
            </div>
            <div className="dashboardContent">
                <div className="home">
                    {selectedOption === "home" && <ViewStudioBookings/>}
                </div>
                <div className="createService">
                    {selectedOption === "create-package" && <PackageForm />}
                </div>
                <div className="removeService">
                    {selectedOption === "edit-package" && <EditPackage/>}
                </div>
                <div className="updateService">
                    {selectedOption === "charts" && <PeakBookingDaysChart/>}
                </div>
                <div className="viewQuotations">
                    {selectedOption === "list" && <PackageManagement/>}
                </div>
                {/* <div className="imageUpload">
                    {selectedOption === "image-upload" && <ImageUpload/>}  
                </div> */}
            </div>
        </div>
    )
}