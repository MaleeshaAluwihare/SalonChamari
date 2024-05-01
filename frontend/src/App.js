import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router and Routes
import './App.css';


//Chavidu
import StudioBookingForm from './components/Chavidu/studioBookingForm';
import SalonBookingForm from './components/Chavidu/salonBookingForm';
import StudioHome from './pages/chavidu/StudioHome';
import Header from './components/Chavidu/Header';
// import PackageManagement from './components/Chavidu/studioPackageAdmin';
// import PeakBookingDaysChart from './components/Chavidu/bookingDataChart';
import StudioImageUploader from './components/Chavidu/studioImageForm';
import ImageDisplay from './components/Chavidu/displayPackageImages';
// import PackageForm from './components/Chavidu/createStudioPackage';
// import EditPackage from './components/Chavidu/editStudioPackage';
// import SalonBookingDaysChart from './components/Chavidu/salonChart';
import ViewStudioBookings from './components/Chavidu/ViewStudioBookings';
import Booking_Dashboard from './pages/chavidu/AdminDashBoard';
import ReservationDashboard from './pages/chavidu/ReservationDashBoard';
// import BookingReport from './components/Chavidu/studioReport';
import DisplayStudioPackages from './components/Chavidu/displayStudioPackage';


//Maleesha
import LandingPage from './pages/Maleesha/LandingPage';
import SalonHome from './pages/Maleesha/SalonHome';
import HairServices from './pages/Maleesha/HairService';
import SkinServices  from './pages/Maleesha/SkinService';
import NailServices from './pages/Maleesha/NailService';
import BridalServices from './pages/Maleesha/BridalService';
import CostumePage from './pages/Maleesha/CostumePage';
import QuotationPage from './pages/Maleesha/QuotationPage';
import Service_Dashboard from './pages/Maleesha/Dashboard';

//Anoj
import StockTable from './components/Anoj/stockTable';
import AddInventory from './pages/Anoj/addInventory';
import InventoryReplacing from './pages/Anoj/replacingInventory';
import UpdateInventory from './pages/Anoj/updateInventory';
import SupplierOrder from './pages/Anoj/supplierOrder';
import ReorderingPage from './pages/Anoj/reorderInventory';
// import ChartComponent from './components/Anoj/chart';
import InventoryDashboard from './pages/Anoj/InventoryDashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/landpage" element={<LandingPage/>} />
        <Route path="/salon-home" element={<SalonHome />} />
        <Route path='/hair-page' element={<HairServices/>}/>
        <Route path='/skin-page' element={<SkinServices/>}/>
        <Route path='/nail-page' element={<NailServices/>}/>
        <Route path='/bridal-page' element={<BridalServices/>}/>
        <Route path='/costume-page' element={<CostumePage/>}/>
        <Route path='/quote-page' element={<QuotationPage/>}/>
        <Route path='/dash' element={<Service_Dashboard/>}/>

        <Route path="/Salon/booking" element={<SalonBookingForm/>} />
        <Route path="/Studio" element={<StudioHome/>} />
        <Route path="/studio/booking" element={<StudioBookingForm />} />
        <Route path="/admin" element={<Booking_Dashboard />} />
        <Route path="/admin/Reservation" element={<ReservationDashboard />} />
        <Route path="/admin/studioBookings" element={<ViewStudioBookings />} />
        <Route path="/admin/addImage" element={<StudioImageUploader />} />
        <Route path="/admin/viewPackageImage" element={<ImageDisplay />} />

        <Route path='/inventoryDashboard' element={<InventoryDashboard />} />
        {/* <Route path='/chart' element={<ChartComponent />} /> */}
        <Route path='/add' element={<AddInventory />} />
        <Route path='/stock' element={<StockTable/>} />
        <Route path='/reorder' element={<ReorderingPage/>} />
        <Route path='/update' element={<UpdateInventory />} />
        <Route path='/edit' element={<InventoryReplacing/>} />
        <Route path='/order' element={<SupplierOrder/>} />
        <Route path='/dashboard' element={<InventoryDashboard/>}/>
      </Routes>
    </div>
  );
}


export default App;

