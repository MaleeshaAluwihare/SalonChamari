import './App.css';
import InventoryDash from './pages/Anoj/inventoryDash';
import AddInventory from './pages/Anoj/addInventory';
import DeleteInventory from './pages/Anoj/deleteInventory';
import ReorderInventory from './pages/Anoj/reorderInventory';

function App() {
  return (
    <div className="App">
        <InventoryDash/>
        <AddInventory/>
        <DeleteInventory/>
        <ReorderInventory/>
    </div>
  );
}

export default App;
