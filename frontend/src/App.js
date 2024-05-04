import React, {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import bg from './images/Pulasthi/hello.png';
import { AppStyled } from './css/Pulasthi/AppStyled'; //import AppStyled
import { MainLayout } from './css/Pulasthi/Layouts';
import Navigation from './components/Pulasthi/Navigation/Navigation';

import DashboardWrapper from './components/Pulasthi/Wrapper/DashboardWrapper';
import BudgetWrapper from './components/Pulasthi/Wrapper/BudgetWrapper';
import IncomeWrapper from './components/Pulasthi/Wrapper/IncomeWrapper';
import ExpenseWrapper from './components/Pulasthi/Wrapper/ExpensesWrapper';
import InventoryWrapper from './components/Pulasthi/Wrapper/InventoryWrapper';
import EmployeeWrapper from './components/Pulasthi/Wrapper/EmployeeWrapper';
import EventWrapper from './components/Pulasthi/Wrapper/EventWrapper';


function App() {
  
  return (
    <div className="App">
      <Router>
        <AppStyled bg={bg}>
          <MainLayout>
            <Navigation/>
            <main>
            <Routes>
              <Route path="/financeDashboard" element={<DashboardWrapper />} />
              <Route path="/budget" element={<BudgetWrapper />} />
              <Route path="/income" element={<IncomeWrapper />} />
              <Route path="/expenses" element={<ExpenseWrapper />} />
              <Route path="/salary" element={<EmployeeWrapper/>} />
              <Route path="/inventory" element={<InventoryWrapper />} />
              <Route path="/packages" element={<EventWrapper/>} />
            </Routes>
            </main>
          </MainLayout>
        </AppStyled>
      </Router>
    </div>
  );
}

export default App;
