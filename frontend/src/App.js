
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router and Routes
import './App.css';


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
import FeedbackCustomer from './pages/FeedbackCustomer';
import ClientHome from './pages/ClientHome';
import SendFeedback from './components/Dasun/SendFeedbackCustomer';
import MessageCustomer from './pages/MessageCustomer';
import SendMessage from './components/Dasun/SendMessageCustomer';
import CustomerBlog from './pages/BlogCustomer';
import CustomerFaq from './pages/FaqCustomer';
import DeleteFeedback from './components/Dasun/deleteFeedback';
import DeleteMessage from './components/Dasun/deleteMessage';
import DashboardSideBar from './components/Dasun/FaqDashBoardSideBar';
import FaqDashboard from './pages/FaqDashboard';



function App() {
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
        {/* <Route path='/chart' element={<ChartComponent />} /> */}
        <Route path='/add' element={<AddInventory />} />
        <Route path='/stock' element={<StockTable/>} />
        <Route path='/reorder' element={<ReorderingPage/>} />
        <Route path='/update' element={<UpdateInventory />} />
        <Route path='/edit' element={<InventoryReplacing/>} />
        <Route path='/order' element={<SupplierOrder/>} />
        <Route path='/dashboard' element={<InventoryDashboard/>}/>

        <Route path='/faq-admin-dash' exact Component={<FaqDashboard />} /> 
        <Route path='/faq/all' exact Component={AllFaqs} /> 
        <Route path="/faq/add" exact Component={AddFaq} /> 
        <Route path='/faq/update/:faqId' Component={UpdateFaq} />
        <Route path="/faq/delete/:faqId" Component={DeleteFaq} />
        <Route path="/CustomerMessages/all" exact Component={Messages} />
        <Route path="/CustomerMessages/delete/:messageId" exact Component={DeleteMessage} />
        <Route path="/feedback/all" exact Component={Feedbacks} />
        <Route path="/feedback/delete/:feedbackId" Component={DeleteFeedback} />
        <Route path="/ReplyMessage/add/:messageId" exact Component={ReplyMessage} />
        <Route path="/blog/add" exact Component={AddBlog} />
        <Route path="/blog/all" exact Component={ViewBlog} />
        <Route path="/clientSide" exact Component={ClientHome} />
        <Route path="/feedbackCustomer" exact Component={FeedbackCustomer} />
        <Route path="/feedbackCustomer/add" exact Component={SendFeedback} />
        <Route path="/messageCustomer" exact Component={MessageCustomer} />
        <Route path="/messageCustomer/add" exact Component={SendMessage} />
        <Route path="/blogCustomer" exact Component={CustomerBlog} />
        <Route path="/faqCustomer" exact Component={CustomerFaq} />

      </Routes>
    </div>

  );
}


export default App;

