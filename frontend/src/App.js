import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Maleesha
// import LandingPage from './pages/Maleesha/LandingPage';
// import SalonHome from './pages/Maleesha/SalonHome';
// import HairServices from './pages/Maleesha/HairService';
// import SkinServices  from './pages/Maleesha/SkinService';
// import NailServices from './pages/Maleesha/NailService';
// import BridalServices from './pages/Maleesha/BridalService';
// import CostumePage from './pages/Maleesha/CostumePage';
// import QuotationPage from './pages/Maleesha/QuotationPage';
import Dashboard from './pages/Maleesha/Dashboard';

// import AddService from './components/Maleesha/AddService';
// import ServiceDetails from './components/Maleesha/SearchService';
// import CounterClass from './components/Maleesha/ClassBaseApproch';
// import CounterFunction from './components/Maleesha/CounterFunction';
// import Header from './pages/Maleesha/Header';
// import MainPage from './pages/Maleesha/MainPage';
// import ImageForme from './components/Maleesha/ImageForm';
// import ServiceList from './components/Maleesha/ServiceList';
// import DeleteService from './components/Maleesha/DeleteService';
// import UpdateService from './components/Maleesha/UpdateService';
// import EmailForm from './pages/Maleesha/EmailSend';
// import FooterWave from './components/Maleesha/FooterWave';
// import Footer from './components/Maleesha/Footer';


function App() {

  return (
    <div className='App'>
        <Dashboard/>

        {/* <Routes>

          <Route path="/" element={<LandingPage/>} />
          <Route path="/salon-home" element={<SalonHome />} />
          <Route path='/hair-page' element={<HairServices/>}/>
          <Route path='/skin-page' element={<SkinServices/>}/>
          <Route path='/nail-page' element={<NailServices/>}/>
          <Route path='/bridal-page' element={<BridalServices/>}/>
          <Route path='/costume-page' element={<CostumePage/>}/>
          <Route path='/quote-page' element={<QuotationPage/>}/>
          <Route path='/dash' element={<Dashboard/>}/>
          

        </Routes> */}

    </div>
  )
}

export default App;
