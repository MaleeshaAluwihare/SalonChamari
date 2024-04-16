import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { InnerLayout } from "../../../css/Pulasthi/Layouts";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import Form from "../Form/Form";
import BudgetItem from "../BudgetItem/BudgetItem";
import Button from "../Button/Button";
import { search } from "../../../utils/Pulasthi/Icons";
import SearchBudgetItem from "../Search/SearchBudgetItem";

function Budget() {

  //here useGlobalContext used to bring globalContext methods
  //these methods are coming from globalContext
  //addBudget method render in form componenet
  const {addBudget,getBudgets,budgets,deleteBudget,updateBudget,getOneBudget,budget} = useGlobalContext();
  const [budgetId, setBudgetId] = useState('');
  //useEffect take backend response array to budget component
  //useEffect use wena pradana thanak tama me budgets okkoma display karana functional component eka
  const handleSearch = () => {
    if (budgetId.trim() === '') {
      alert('Please enter a Budget ID.');
      return;
    }
    getOneBudget(budgetId);
  };
  useEffect(() =>{
    getBudgets()
  },[])
//structure of the get budgets
  return (
    <BudgetStyled>
      <InnerLayout>
        <h1>Budget</h1>
          {/* search Budget */}
          <div className="search-container">
              <label htmlFor="BudgetId">Enter Budget ID:&nbsp;</label>
              <input 
               type="text" 
               id="BudgetId"
               placeholder="Budget ID"
                
               value={budgetId} 
               onChange={(e) => setBudgetId(e.target.value)}
               />
              <Button icon={search} 
                  bPad={'.5rem'}
                  // bRad={'0%'}
                  bg={'var(--primary-color'}
                  color={'#fff'}
                  iColor={'#fff'}
                  hColor={'var(--color-green)'}
                  onClick={handleSearch}
              /> 
          </div>
          <SearchBudgetItem budget={budget} />

        <div className="budget-content">
          <div className="form-container"></div>
          
          {/* add budget */}
          <div className="budgets">
              <Form/>
          </div>
          
          {/* get budgets */}
          <div className="budgets">
              {budgets.map((budget) => {
                  const {_id, budgetId, month, amount, date,} = budget;
                  // one functional component access another component
                  return <BudgetItem
                      key={_id}
                      id={_id} 
                      budgetId={budgetId} 
                      month={month} 
                      amount={amount} 
                      date={date}  
                      indicatorColor="var(--color-DarkYellow)"
                      deleteItem={deleteBudget}
                      updateItem = {updateBudget}
                  />
              })}
          </div>
        </div>
      </InnerLayout>
    </BudgetStyled>
  )
};

const BudgetStyled = styled.div`
    display: flex;
    overflow: auto;
    .search-container{
      //1)search container eke tyenna okkoma elements tika flex box ekakata danawa
      display: flex;
      //2)dn e flex box eke items center karanwa
      align-items: center;
      margin-left:50rem;
      margin-bottom:1rem;
    }
    .budget-content{
        display: flex;
        gap: 1rem;
        .budgets{
            flex:1;
        }
    }
`;


export default Budget





