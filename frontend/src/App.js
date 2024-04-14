import './CSS/App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Dasun/Header';
import AddFaq from './components/Dasun/addFaq';
import AllFaqs from './components/Dasun/allFaq';
import UpdateFaq from './components/Dasun/updateFaq';
import Messages from './components/Dasun/Messages';
import Feedbacks from './components/Dasun/AllFeedbacks';
import ReplyMessage from './components/Dasun/ReplyMessage';


function App() {
  return (
    <Router>
        <div className="App">

          <Header />
          
          <br />

          <Routes>

            <Route path='/faq/all' exact Component={AllFaqs} /> 
            <Route path="/faq/add" exact Component={AddFaq} /> 
            <Route path="/faq/update/${faqs._id}" exact Component={UpdateFaq} />
            <Route path="/CustomerMessages/all" exact Component={Messages} />
            <Route path="/feedback/all" exact Component={Feedbacks} />
            <Route path="/ReplyMessage/add" exact Component={ReplyMessage} />

          </Routes>

        </div>
    </Router>
  );
}

export default App;
