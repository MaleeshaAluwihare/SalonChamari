import React from "react";
import StockTable from "../../components/Anoj/stockTable";
import { BarChart } from "../../components/Anoj/Bar"
import { LineGraph as LineChartData } from "../../components/Anoj/Line";
import PieChart from "../../components/Anoj/Pie"; 
import DashboardSideBar from "../../components/Anoj/InventoryDashboardSideBar"
import ItemTable from "./supplierOrder";


export default function InventoryDash() {
  return (
    <>
    <button>Report Generation</button>
      <StockTable />
      <BarChart />
      <LineChartData />
      <PieChart />
      <DashboardSideBar/>
      <ItemTable/>
      
    </>
  );
}