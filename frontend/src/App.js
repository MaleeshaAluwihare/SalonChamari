import './App.css';
import React from 'react';
import salonBookingForm from './components/salonBookingForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';


function App() {
    return (
      <div className="App">
          <h1>My App</h1>
          <salonBookingForm />
      </div>
    );
  }

export default App;
