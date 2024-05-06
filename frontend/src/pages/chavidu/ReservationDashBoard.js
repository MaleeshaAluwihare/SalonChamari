import React, { useState } from "react";

import PeakBookingDaysChart from '../../components/Chavidu/bookingDataChart';
import SalonBookingDaysChart from '../../components/Chavidu/salonChart';
import ViewStudioBookings from '../../components/Chavidu/ViewStudioBookings';
import ReservationSideBar from '../../components/Chavidu/ReservationSideBar';
import ReservationCountChart from '../../components/Chavidu/ReservationDashboardHome';

import '../../css/chavidu/DashBoard.css';

export default function ReservationDashboard(){

    const [selectedOption, setSelectedOption] = useState('home');

    return(
        <div className="dashboardContainer">
            <div className="sideBar">
                <ReservationSideBar onSelectOption={setSelectedOption}/>
            </div>
            <div className="dashboardContent">
                <div className="home">
                    {selectedOption === "home" && <ReservationCountChart/>}
                </div>
                <div className="createService">
                    {selectedOption === "Salon-Reservations" && <ViewStudioBookings />}
                </div>
                <div className="removeService">
                    
                    {selectedOption === "Studio-Reservations" && <ViewStudioBookings/>}
                </div>
                <div className="updateService">
                    {selectedOption === "Studio-Analytics" && <PeakBookingDaysChart/>}
                </div>
                {/* <div className="viewQuotations">
                    {selectedOption === "list" && <PackageManagement/>}
                </div>
                <div className="imageUpload">
                    {selectedOption === "image-upload" && <ImageUpload/>}  
                </div> */}
            </div>
        </div>
    )
}