import React, { useState } from "react";
import StockTable from '../../components/Anoj/stockTable';
import '../../css/Anoj/InventoryDashboard.css';
import DashboardSideBar from '../../components/Anoj/InventoryDashboardSideBar';
import AddInventory from "./addInventory";
import UpdateInventory from "./updateInventory";
import ReorderingPage from "./reorderInventory";
import InventoryReplacing from "./replacingInventory";


export default function InventoryDashboard(){

    const [selectedOption, setSelectedOption] = useState('home');

    return(
        <div className="dashboardContainer">
            <div className="sideBar">
                <DashboardSideBar onSelectOption={setSelectedOption}/>
            </div>
            <div className="dashboardContent">
                <div className="home">
                    {selectedOption === "home" && <StockTable/>}
                </div>
                <div className="createService">
                    {selectedOption === "create-stock" && <AddInventory />}
                </div>
                <div className="update-stock">
                    {selectedOption === "update-stock" && <UpdateInventory />}
                </div>
                <div className="reorder-stock">
                    {selectedOption === "reorder-stock" &&  <ReorderingPage/>}
                </div>
                <div className="stock-list">
                    {selectedOption === "stock-list" && <InventoryReplacing/>}
                </div>
                {/* <div className="imageUpload">
                    {selectedOption === "image-upload" && <ImageUpload/>}  
                </div> */}
            </div>
        </div>
    )
}
