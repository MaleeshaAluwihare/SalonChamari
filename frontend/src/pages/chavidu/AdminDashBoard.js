import React, { useState } from "react";
import PackageManagement from '../../components/Chavidu/studioPackageAdmin';
import PeakBookingDaysChart from '../../components/Chavidu/bookingDataChart';
import PackageForm from '../../components/Chavidu/createStudioPackage';
import EditPackage from '../../components/Chavidu/editStudioPackage';
import SideBar from '../../components/Chavidu/AdminSideBar';
import ViewStudioBookings from '../../components/Chavidu/ViewStudioBookings';
import styles from '../../css/chavidu/DashBoard.module.css';

export default function Dashboard(){

    const [selectedOption, setSelectedOption] = useState('home');

    return(
        <div className={styles.dashboardContainer}>
            <div className={styles.sideBar}>
                <SideBar onSelectOption={setSelectedOption}/>
            </div>
            <div className={styles.dashboardContent}>
                <div className={styles.home}>
                    {selectedOption === "home" && <ViewStudioBookings/>}
                </div>
                <div className={styles.createService}>
                    {selectedOption === "create-package" && <PackageForm />}
                </div>
                <div className={styles.removeService}>
                    {selectedOption === "edit-package" && <EditPackage/>}
                </div>
                <div className={styles.updateService}>
                    {selectedOption === "charts" && <PeakBookingDaysChart/>}
                </div>
                <div className={styles.viewQuotations}>
                    {selectedOption === "list" && <PackageManagement/>}
                </div>
            </div>
        </div>
    )
}
