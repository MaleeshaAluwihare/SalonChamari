import './CSS/App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Dasun/Header';
import AddFaq from './components/Dasun/addFaq';
import AllFaqs from './components/Dasun/allFaq';
import UpdateFaq from './components/Dasun/updateFaq';

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

          </Routes>

        </div>
    </Router>
  );
}

export default App;
