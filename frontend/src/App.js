import "./css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Devinda/home";
import { Packages } from "./pages/Devinda/packages";
import { EventForm } from "./pages/Devinda/eventForm";
import { EventSummary } from "./pages/Devinda/eventSummary";
import { EventDashBoard } from "./pages/Devinda/eventDashBoard";
import { EventPackageDashboard } from "./pages/Devinda/eventPackageDashboard";
import { UpdateEventPackage } from "./pages/Devinda/updateEventPackage";
import EventCustomization from './pages/Devinda/customEventPackage';
import EventCustomizationDash from './pages/Devinda/eventCustomPackageDashboard';
import {CustomEventForm} from './pages/Devinda/customEventForm';
import {CustomEventSummary} from './pages/Devinda/customEventSummary';
import {EventManagerDashboard} from './pages/Devinda/eventManagerDashboard';
import { AddEventManager } from "./pages/Devinda/addEventManager";
import Header from "./components/devinda/Header";
import SplitView from "./pages/Devinda/eventLanding";



function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<SplitView />}></Route>
          

          <Route path="/packages" element={<Packages />}></Route>
          <Route path="/eventForm" element={<EventForm />}></Route>
          <Route path="/eventSummary" element={<EventSummary />}></Route>
          <Route path="/eventDashboard" element={<EventDashBoard />}></Route>
          <Route path="/packageDashboard" element={<EventPackageDashboard />}></Route>
          <Route path="/updateEventPackage" element={<UpdateEventPackage />}></Route>
          <Route path="/customEventPackage" element={<EventCustomization />}></Route>
          <Route path="/eventCustomPackageDashboard" element={<EventCustomizationDash />}></Route>
          <Route path="/customEventSummary" element={<CustomEventSummary />}></Route>
          <Route path="/eventManagerDashboard" element={<EventManagerDashboard />}></Route>
          <Route path="/customEventForm" element={<CustomEventForm />}></Route>
          <Route path="/addEventManager" element={<AddEventManager />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
