import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import InventoryDash from './pages/Anoj/inventoryDash';
import AddInventory from './pages/Anoj/addInventory';
import InventoryReplacing from './pages/Anoj/replacingInventory';
import UpdateInventory from './pages/Anoj/updateInventory';
import SupplierOrder from './pages/Anoj/supplierOrder';
import NavBars from './components/Anoj/navBars';
import ReorderingPage from './pages/Anoj/reorderInventory';
import ChartComponent from './components/Anoj/chart';





function App() {
  return (
    <Router>
      <div className="App">
        <NavBars/>
        <Routes>
        <Route path='/chart' element={<ChartComponent />} />
          <Route path='/add' element={<AddInventory />} />
          <Route path='/dash' element={<InventoryDash />} />
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

