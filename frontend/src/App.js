import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AddService from './components/Maleesha/AddService';
// import Header from './components/Maleesha/Header';
// import ServiceDetails from './components/Maleesha/SearchService';
import SaloonEmployeetable from './components/pages/Yasiru/SaloonEmployeetable';
import Addemployee from './components/pages/Yasiru/Addemployee';
import EditEmployeeDetails from './components/pages/Yasiru/EditEmployeeDetails';
import StudioEmployeeDetails from './components/pages/Yasiru/StudioEmployeeDetails';
import Employeereservation from './components/pages/Yasiru/Employeereservation';
import EmployeeProfile from './components/pages/Yasiru/EmployeeProfile';
import DeleteEmployeedatials from './components/pages/Yasiru/DeleteEmployeedetails';
import NavBars from './components/Yasiru/Navbar';
import ProfileLoging from './components/pages/Yasiru/Profileloging';

function App() {
  return (
    <Router>
    <div className="App">
    <NavBars/>
      <Routes>
        {/* <h1>hello</h1>
        <AddService/> 
        <hr></hr>
        <ServiceDetails/> */}
        <Route path ='/Edit' element ={<EditEmployeeDetails/>} />
        <Route path ='/SaloonTable' element ={<SaloonEmployeetable/>} />
        <Route path ='/Add' element ={<Addemployee/>} />
        <Route path ='/StudioTable' element ={<StudioEmployeeDetails/>} />
        <Route path ='/Reservation' element ={<Employeereservation/>} />
        <Route path ='/profile' element ={<EmployeeProfile/>} />
        <Route path ='/Deletesaloon' element ={<DeleteEmployeedatials/>} />
        <Route path ='/Profilloging' element ={<ProfileLoging/>} />
        

        


      </Routes>
             
    </div>
    </Router>
  );
}

export default App;
