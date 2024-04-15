import './CSS/App.css';
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
            <Route path='/faq/delete/:faqId' Component={DeleteFaq} />
            <Route path="/CustomerMessages/all" exact Component={Messages} />
            <Route path="/feedback/all" exact Component={Feedbacks} />
            <Route path="/ReplyMessage/add" exact Component={ReplyMessage} />
            <Route path="/blog/add" exact Component={AddBlog} />
            <Route path="/blog/all" exact Component={ViewBlog} />

          </Routes>

        </div>
    </Router>
  );
}

export default App;
