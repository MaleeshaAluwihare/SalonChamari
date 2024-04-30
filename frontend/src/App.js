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


function App() {

  return (
    <Router>
      <div className="App">

          <Route path="/" element={<LandingPage/>} />
          <Route path="/salon-home" element={<SalonHome />} />
          <Route path='/hair-page' element={<HairServices/>}/>
          <Route path='/skin-page' element={<SkinServices/>}/>
          <Route path='/nail-page' element={<NailServices/>}/>
          <Route path='/bridal-page' element={<BridalServices/>}/>
          <Route path='/costume-page' element={<CostumePage/>}/>
          <Route path='/quote-page' element={<QuotationPage/>}/>
          <Route path='/dash' element={<Service_Dashboard/>}/>

        {<Header />}
        <Routes>
        <Route path="/Salon/booking" element={<SalonBookingForm/>} />
        <Route path="/Studio" element={<StudioHome/>} />
        <Route path="/studio/booking" element={<StudioBookingForm />} />
        <Route path="/" element={<DisplayStudioPackages />} />
        <Route path="/admin" element={<Booking_Dashboard />} />
        <Route path="/admin/Reservation" element={<ReservationDashboard />} />
        <Route path="/admin/studioBookings" element={<ViewStudioBookings />} />
        <Route path="/admin/addImage" element={<StudioImageUploader />} />
        <Route path="/admin/viewPackageImage" element={<ImageDisplay />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
