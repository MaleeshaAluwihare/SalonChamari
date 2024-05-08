import React, { useState } from "react";

import PeakBookingDaysChart from '../../components/Chavidu/bookingDataChart';
import SalonBookingDaysChart from '../../components/Chavidu/salonChart';
import ViewSalonBookings from '../../components/Chavidu/ViewSalonBookings';
import ViewStudioBookings from '../../components/Chavidu/ViewStudioBookings';
import ReservationSideBar from '../../components/Chavidu/ReservationSideBar';
import ReservationCountChart from '../../components/Chavidu/ReservationDashboardHome';

import styles from '../../css/chavidu/DashBoard.module.css';

export default function ReservationDashboard(){

    const [selectedOption, setSelectedOption] = useState('home');

    return(
        <div className={styles.dashboardContainer}>
            <div className={styles.sideBar}>
                <ReservationSideBar onSelectOption={setSelectedOption}/>
            </div>
            <div className={styles.dashboardContent}>
                <div className={styles.home}>
                    {selectedOption === "home" && <ReservationCountChart/>}
                </div>
                <div className={styles.createService}>
                    {selectedOption === "Salon-Reservations" && <ViewSalonBookings />}
                </div>
                <div className={styles.removeService}>
                    {selectedOption === "Studio-Reservations" && <ViewStudioBookings/>}
                </div>
                <div className={styles.updateService}>
                    {selectedOption === "Studio-Analytics" && <PeakBookingDaysChart/>}
                </div>
            </div>
        </div>
    )
}
