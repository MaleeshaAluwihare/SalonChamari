
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

//devinda
import { EventPackages } from "./pages/Devinda/eventPackages";
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
import SystemAdminPanel from './pages/Devinda/SystemAdminPanel';
import { AddEventManager } from "./pages/Devinda/addEventManager";
// import Header from "./components/devinda/Header";


//nisalka
import Profile from "../src/components/nisalka/Profile";
import Signup from "../src/components/nisalka/Signup";
import Login from "../src/components/nisalka/Login";
import CMdashboard from "./components/nisalka/CMdashboard";
import Forgot from "./components/nisalka/forgotpassword";

//Chavidu
import StudioBookingForm from './components/Chavidu/studioBookingForm';
import SalonBookingForm from './components/Chavidu/salonBookingForm';
import StudioHome from './pages/chavidu/StudioHome';
// import Header from './components/Chavidu/Header';
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
// import DisplayStudioPackages from './components/Chavidu/displayStudioPackage';
import AdminLogin from './components/Dasun/AdminLogin';


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

//Anoj
import StockTable from './components/Anoj/stockTable';
import AddInventory from './pages/Anoj/addInventory';
import InventoryReplacing from './pages/Anoj/replacingInventory';
import UpdateInventory from './pages/Anoj/updateInventory';
import SupplierOrder from './pages/Anoj/supplierOrder';
import ReorderingPage from './pages/Anoj/reorderInventory';
// import ChartComponent from './components/Anoj/chart';
import InventoryDashboard from './pages/Anoj/InventoryDashboard';


//dasun
import Header from './components/Dasun/Header';
import AddFaq from './components/Dasun/addFaq';
import AllFaqs from './components/Dasun/allFaq';
import UpdateFaq from './components/Dasun/updateFaq';
import Messages from './components/Dasun/Messages';
import Feedbacks from './components/Dasun/AllFeedbacks';
import ReplyMessage from './components/Dasun/ReplyMessage';
import FaqUpdate from './components/Dasun/updateFaq';
import DeleteFaq from './components/Dasun/deleteFaq';
import AddBlog from './components/Dasun/addBlog';
import ViewBlog from './components/Dasun/allBlog';
import FeedbackCustomer from './pages/Dasun/FeedbackCustomer';
import ClientHome from './pages/Dasun/ClientHome';
import SendFeedback from './components/Dasun/SendFeedbackCustomer';
import MessageCustomer from './pages/Dasun/MessageCustomer';
import SendMessage from './components/Dasun/SendMessageCustomer';
import CustomerBlog from './pages/Dasun/BlogCustomer';
import CustomerFaq from './pages/Dasun/FaqCustomer';
import DeleteFeedback from './components/Dasun/deleteFeedback';
import DeleteMessage from './components/Dasun/deleteMessage';
import DashboardSideBar from './components/Dasun/FaqDashBoardSideBar';
import FaqDashboard from './pages/Dasun/FaqDashboard';

//Pulasthi
import DashboardWrapper from './components/Pulasthi/Wrapper/DashboardWrapper';
import BudgetWrapper from './components/Pulasthi/Wrapper/BudgetWrapper';
import IncomeWrapper from './components/Pulasthi/Wrapper/IncomeWrapper';
import ExpenseWrapper from './components/Pulasthi/Wrapper/ExpensesWrapper';
import InventoryWrapper from './components/Pulasthi/Wrapper/InventoryWrapper';
import EmployeeWrapper from './components/Pulasthi/Wrapper/EmployeeWrapper';
import EventWrapper from './components/Pulasthi/Wrapper/EventWrapper';

//yasiru
import EditEmployeeDetails from './pages/Yasiru/EditEmployeeDetails';
import EmpProfile from './pages/Yasiru/EmpProfile'
import DeleteEmployeedatials from './pages/Yasiru/DeleteEmployeedetails';
import NavBars from './components/Yasiru/Navbar';
import EmpLogin from './pages/Yasiru/EmpLogin';
import AddEmployee from './pages/Yasiru/Addemployee';
import SaloonEmployeetable from'./pages/Yasiru/SaloonEmployeetable';
import Attendancepage from './pages/Yasiru/attendancepage';
import Attendancecount from './pages/Yasiru/Attendancecount';
import Dashboard from './pages/Yasiru/EmployeeDashboard';
import Leave from './pages/Yasiru/Leavesgiven';
import Leavedetails from './pages/Yasiru/Leavedetails';
import Home from './pages/Yasiru/Home';



function App() {
  
  const user = localStorage.getItem("token");
  return (
    <div className="App">
   
          <Routes>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/salon-home" element={<SalonHome />} />
              <Route path='/hair-page' element={<HairServices/>}/>
              <Route path='/skin-page' element={<SkinServices/>}/>
              <Route path='/nail-page' element={<NailServices/>}/>
              <Route path='/bridal-page' element={<BridalServices/>}/>
              <Route path='/costume-page' element={<CostumePage/>}/>
              <Route path='/quote-page' element={<QuotationPage/>}/>
              <Route path='/dash' element={<Service_Dashboard/>}/>

              <Route path="/Salon/booking" element={<SalonBookingForm/>} />
              <Route path="/Studio" element={<StudioHome/>} />
              <Route path="/studio/booking" element={<StudioBookingForm />} />
              <Route path="/admin" element={<Booking_Dashboard />} />
              <Route path="/admin/Reservation" element={<ReservationDashboard />} />
              <Route path="/admin/studioBookings" element={<ViewStudioBookings />} />
              <Route path="/admin/addImage" element={<StudioImageUploader />} />
              <Route path="/admin/viewPackageImage" element={<ImageDisplay />} />

              <Route path='/inventoryDashboard' element={<InventoryDashboard />} />
              <Route path='/add' element={<AddInventory />} />
              <Route path='/stock' element={<StockTable/>} />
              <Route path='/reorder' element={<ReorderingPage/>} />
              <Route path='/update' element={<UpdateInventory />} />
              <Route path='/edit' element={<InventoryReplacing/>} />
              <Route path='/order' element={<SupplierOrder/>} />
              <Route path='/dashboard' element={<InventoryDashboard/>}/>

              
              {user && <Route path="/profile/:email" exact element={<Profile />} />}
              <Route path="/signup" exact element={<Signup />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/login" element={<Navigate replace to="/login" />} />
              <Route path="/cmdash" element={<CMdashboard/>}/>
              <Route path="/Uactivity" element={<CMdashboard/>}/>
              <Route path="/Memails" element={<CMdashboard/>}/>
              <Route path="/forgot" element={<Forgot/>}/>
              
              
              

              <Route path='/faq-admin-dash' element={<FaqDashboard />} /> 
              <Route path='/faq/all' element={<AllFaqs />} /> 
              <Route path="/faq/add" element={<AddFaq />} /> 
              <Route path='/faq/update/:faqId' element={<UpdateFaq />} />
              <Route path="/faq/delete/:faqId" element={<DeleteFaq />} />
              <Route path="/CustomerMessages/all" element={<Messages />} />
              <Route path="/CustomerMessages/delete/:messageId" element={<DeleteMessage />} />
              <Route path="/feedback/all" element={<Feedbacks />} />
              <Route path="/feedback/delete/:feedbackId" element={<DeleteFeedback />} />
              <Route path="/ReplyMessage/add/:messageId" element={<ReplyMessage />} />
              <Route path="/blog/add" element={<AddBlog />} />
              <Route path="/blog/all" element={<ViewBlog />} />
              <Route path="/clientSide" element={<ClientHome />} />
              <Route path="/feedbackCustomer" element={<FeedbackCustomer />} />
              <Route path="/feedbackCustomer/add" element={<SendFeedback />} />
              <Route path="/messageCustomer" element={<MessageCustomer />} />
              <Route path="/messageCustomer/add" element={<SendMessage />} />
              <Route path="/blogCustomer" element={<CustomerBlog />} />
              <Route path="/faqCustomer" element={<CustomerFaq />} />

              <Route path="/financeDashboard" element={<DashboardWrapper />} />
              <Route path="/budget" element={<BudgetWrapper />} />
              <Route path="/income" element={<IncomeWrapper />} />
              <Route path="/expenses" element={<ExpenseWrapper />} />
              <Route path="/salary" element={<EmployeeWrapper/>} />
              <Route path="/inventory" element={<InventoryWrapper />} />
              <Route path="/packages" element={<EventWrapper/>} />
              <Route path="/adlogin" element={<AdminLogin/>}/>

              {user && <Route path="/profile/:email" exact element={<Profile />} />}
			        <Route path="/signup" exact element={<Signup />} />
			        <Route path="/login" exact element={<Login />} />
              <Route path="/login" element={<Navigate replace to="/login" />} />

              {/*  admin login */}
              <Route path="/cmdash" element={<CMdashboard/>}/>
              <Route path="/Uactivity" element={<CMdashboard/>}/>
              <Route path="/Memails" element={<CMdashboard/>}/>
              <Route path="/forgot" element={<Forgot/>}/>

              <Route path='/Attendacecount'element={<Attendancecount/>}/>
              <Route path='/Attendacegive'element={<Attendancepage/>}/>
              <Route path='/EmployeeDetails'element={<SaloonEmployeetable/>}/>
              <Route path ='/EmpAdd' element ={<AddEmployee/>} />
              <Route path ='/EmpEdit' element ={<EditEmployeeDetails/>} />
              <Route path ='/profile' element ={<EmpProfile/>} />
              <Route path ='/Deletesaloon' element ={<DeleteEmployeedatials/>} />
              <Route path ='/EmpLogin' element ={<EmpLogin/>} />
              <Route path='/EmpDash'element={<Dashboard/>}/>
              <Route path='/forget'element={<forgetpassword/>}/>
              <Route path='/Leavegive'element={<Leave/>}/>
              <Route path='/Leavedetails'element={<Leavedetails/>}/>
              <Route path='/Home'element={<Home/>}/>
              
              <Route path="/SystemAdminPanel" element={<SystemAdminPanel />}></Route>  
              <Route path="/Eventpackages" element={<EventPackages />}></Route>
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
    </div>
  );

  
}


export default App;

