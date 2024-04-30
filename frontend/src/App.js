import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router and Routes
import StudioBookingForm from './components/Chavidu/studioBookingForm';
import SalonBookingForm from './components/Chavidu/salonBookingForm';
import StudioHome from './pages/chavidu/StudioHome';
import Header from './components/Chavidu/Header';
import PackageManagement from './components/Chavidu/studioPackageAdmin';
import PeakBookingDaysChart from './components/Chavidu/bookingDataChart';
import StudioImageUploader from './components/Chavidu/studioImageForm';
import ImageDisplay from './components/Chavidu/displayPackageImages';
import PackageForm from './components/Chavidu/createStudioPackage';
import EditPackage from './components/Chavidu/editStudioPackage';
import SalonBookingDaysChart from './components/Chavidu/salonChart';
import ViewStudioBookings from './components/Chavidu/ViewStudioBookings';
import Dashboard from './pages/chavidu/AdminDashBoard';
import ReservationDashboard from './pages/chavidu/ReservationDashBoard';
import BookingReport from './components/Chavidu/studioReport';
import DisplayStudioPackages from './components/Chavidu/displayStudioPackage';

function App() {
  return (
    <Router>
      <div className="App">
        {<Header />}
        <Routes>
        <Route path="/Salon/booking" element={<SalonBookingForm/>} />
        <Route path="/Studio" element={<StudioHome/>} />
        <Route path="/studio/booking" element={<StudioBookingForm />} />

        <Route path="/" element={<DisplayStudioPackages />} />

       
        <Route path="/admin" element={<Dashboard />} />
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
