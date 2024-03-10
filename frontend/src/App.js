import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './CSS/App.css';
import Home from './pages/home';
import salonBookingForm from './components/Chavidu/salonBookingForm';
import './CSS/salonBookingForm.css';


function App() {
  return (
    <div className="App">
      <h1>Salon Chamari</h1>
      <BrowserRouter>
      <Home />
      <Routes>
        <Route path='/salonBookingForm' element={ <salonBookingForm /> } />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
