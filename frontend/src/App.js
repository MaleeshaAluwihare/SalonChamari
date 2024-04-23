import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import StockTable from './components/Anoj/stockTable';
import AddInventory from './pages/Anoj/addInventory';
import InventoryReplacing from './pages/Anoj/replacingInventory';
import UpdateInventory from './pages/Anoj/updateInventory';
import SupplierOrder from './pages/Anoj/supplierOrder';
import ReorderingPage from './pages/Anoj/reorderInventory';
import ChartComponent from './components/Anoj/chart';
import InventoryDashboard from './pages/Anoj/InventoryDashboard';




function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path='/admin' element={<InventoryDashboard />} />
        <Route path='/chart' element={<ChartComponent />} />
        <Route path='/add' element={<AddInventory />} />
        <Route path='/dash' element={<StockTable/>} />
        <Route path='/reorder' element={<ReorderingPage/>} />
        <Route path='/update' element={<UpdateInventory />} />
        <Route path='/edit' element={<InventoryReplacing/>} />
        <Route path='/order' element={<SupplierOrder/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

