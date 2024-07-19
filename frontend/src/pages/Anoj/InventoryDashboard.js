import React, { useState } from "react";
import StockTable from '../../components/Anoj/stockTable';
import styles from '../../css/Anoj/InventoryDashboard.module.css';
import DashboardSideBar from '../../components/Anoj/InventoryDashboardSideBar';
import AddInventory from "./addInventory";
import UpdateInventory from "./updateInventory";
import ReorderingPage from "./reorderInventory";
import InventoryReplacing from "./replacingInventory";
import SupplierOrder from "./supplierOrder";

export default function InventoryDashboard() {
  const [selectedOption, setSelectedOption] = useState('home');

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sideBar}>
        <DashboardSideBar onSelectOption={setSelectedOption} />
      </div>
      <div className={styles.dashboardContent}>
        <div className={styles.home}>
          {selectedOption === "home" && <StockTable />}
        </div>
        <div className={styles.createService}>
          {selectedOption === "create-stock" && <AddInventory />}
        </div>
        <div className={styles.updateStock}>
          {selectedOption === "update-stock" && <UpdateInventory />}
        </div>
        <div className={styles.reorderStock}>
          {selectedOption === "reorder-stock" && <ReorderingPage />}
        </div>
        <div className={styles.stockList}>
          {selectedOption === "stock-list" && <InventoryReplacing />}
        </div>
        <div className={styles.stockOrder}>
          {selectedOption === "stock-order" && <SupplierOrder />}
        </div>
      </div>
    </div>
  )
}