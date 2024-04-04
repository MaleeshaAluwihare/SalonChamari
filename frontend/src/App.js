import styled from 'styled-components';
import React, {useState} from 'react'
import bg from './images/Pulasthi/hello.png';
import { AppStyled } from './css/Pulasthi/AppStyled'; //import AppStyled
import { MainLayout } from './css/Pulasthi/Layouts';
import Navigation from './components/Pulasthi/Navigation/Navigation';
import Budget from './components/Pulasthi/Budget/Budget';
import Income from './components/Pulasthi/Income/Income';
import Expenses from './components/Pulasthi/Expenses/Expenses';
import EmployeeSalary from './components/Pulasthi/EmployeeSalary/EmployeeSalary';
import InventoryItems from './components/Pulasthi/InventoryItems/InventoryItems';
import EventPackages from './components/Pulasthi/EventPackages/EventPackages';
import Dashboard from './components/Pulasthi/Dashboard/Dashboard';
import { useGlobalContext } from './context/Pulasthi/globalContext';


function App() {

  const [active, setActive] = useState(1)

  // const global=useGlobalContext()
  // console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <Budget />
      case 3:
        return <Income />
      case 4: 
        return <Expenses />
      case 5:
        return <EmployeeSalary/>
      case 6:
        return <InventoryItems/>
      case 7:
        return <EventPackages/>
      default: 
        return <Dashboard />
    }
  }

  return (
    <div className="App">
      <AppStyled bg={bg}>
        <MainLayout>
          <Navigation active={active} setActive={setActive}/>
          <main>
            {displayData()}
          </main>
        </MainLayout>
      </AppStyled>
    </div>
  );
}

export default App;
