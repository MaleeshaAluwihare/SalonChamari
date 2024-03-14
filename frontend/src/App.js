import './App.css';
import CounterClass from './components/ClassBaseApproch';
import CounterFunction from './components/CounterFunction';

function App() {
  return (
    <div className="App">
        <h1>Hello</h1>
        <CounterFunction/>
        <hr></hr>
        <CounterClass/>
    </div>
  );
}

export default App;
