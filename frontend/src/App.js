import './App.css';
import React from 'react';
import salonBookingForm from './components/salonBookingForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AddService from './components/Maleesha/AddService';
import ServiceDetails from './components/Maleesha/SearchService';
// import CounterClass from './components/Maleesha/ClassBaseApproch';
// import CounterFunction from './components/Maleesha/CounterFunction';

function App() {
  return (
    <div className="App">
        <h1>hello</h1>
        <AddService/> 
        <salonBookingForm />
        <hr></hr>
        <ServiceDetails/>
    </div>
  );
}


export default App;
