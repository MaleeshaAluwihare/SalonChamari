import './CSS/Dasun/App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
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


function App() {
  return (
    <Router>
        <div className="App">

          <Header />
          
          <br />

          <Routes>

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
    </Router>
  );
}

export default App;
