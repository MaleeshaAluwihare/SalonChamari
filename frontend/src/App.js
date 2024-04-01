import './App.css';
// import AddService from './components/Maleesha/AddService';
// import Header from './components/Maleesha/Header';
// import ServiceDetails from './components/Maleesha/SearchService';
import SaloonEmployeetable from './components/pages/Yasiru/SaloonEmployeetable';
import Addemployee from './components/pages/Yasiru/Addemployee';
import EditEmployeeDetails from './components/pages/Yasiru/EditEmployeeDetails';
import StudioEmployeeDetails from './components/pages/Yasiru/StudioEmployeeDetails';
import Employeereservation from './components/pages/Yasiru/Employeereservation';
import EmployeeProfile from './components/pages/Yasiru/EmployeeProfile';

function App() {
  return (
    <div className="App">
        {/* <h1>hello</h1>
        <AddService/> 
        <hr></hr>
        <ServiceDetails/> */}
         <SaloonEmployeetable/> 
        <Addemployee/> 
        <EditEmployeeDetails/>
        <StudioEmployeeDetails/>
        <Employeereservation/> 
        <EmployeeProfile/>       
    </div>
  );
}

export default App;
