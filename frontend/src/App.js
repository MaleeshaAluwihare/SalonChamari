import './CSS/App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Dasun/Header';
import AddFaq from './components/Dasun/addFaq';
import AllFaqs from './components/Dasun/allFaq';

function App() {
  return (
    <Router>
        <div className="App">

          <Header />
          
          <br />

          <Routes>

            <Route path='/faq/all' exact Component={AllFaqs} /> 
            <Route path="/faq/add" exact Component={AddFaq} /> 

          </Routes>

        </div>
    </Router>
  );
}

export default App;
