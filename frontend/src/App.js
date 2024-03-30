import './App.css';
import AddService from './components/Maleesha/AddService';
import Header from './components/Maleesha/Header';
import ServiceDetails from './components/Maleesha/SearchService';
import SaloonEmployeetable from './components/pages/Yasiru/SaloonEmployeetable';
// import CounterClass from './components/Maleesha/ClassBaseApproch';
// import CounterFunction from './components/Maleesha/CounterFunction';

function App() {
  return (
    <div className="App">
        <h1>hello</h1>
        <AddService/> 
        <hr></hr>
        <ServiceDetails/>
        <SaloonEmployeetable/>
        <Header/>
    </div>
  );
}

export default App;
