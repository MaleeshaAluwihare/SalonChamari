import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AddService from './components/Maleesha/AddService';
// import Header from './components/Maleesha/Header';
// import ServiceDetails from './components/Maleesha/SearchService';

import EditEmployeeDetails from './pages/Yasiru/EditEmployeeDetails';
import StudioEmployeeDetails from './pages/Yasiru/StudioEmployeeDetails';
import Employeereservation from './pages/Yasiru/Employeereservation';
import EmployeeProfile from './pages/Yasiru/EmployeeProfile'
import DeleteEmployeedatials from './pages/Yasiru/DeleteEmployeedetails';
import NavBars from './components/Yasiru/Navbar';
import ProfileLoging from './pages/Yasiru/Profileloging';
import AddEmployee from './pages/Yasiru/Addemployee';
import SaloonEmployeetable from'./pages/Yasiru/SaloonEmployeetable';
import Attendancepage from './pages/Yasiru/attendancepage';

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
        
        <Route path='/Attendacegive'element={<Attendancepage/>}/>
        <Route path='/EmployeeDetails'element={<SaloonEmployeetable/>}/>
        <Route path ='/Add' element ={<AddEmployee/>} />
        <Route path ='/Edit' element ={<EditEmployeeDetails/>} />
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
