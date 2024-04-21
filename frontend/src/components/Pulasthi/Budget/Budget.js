import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { InnerLayout } from "../../../css/Pulasthi/Layouts";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import Form from "../Form/Form";
import BudgetItem from "../BudgetItem/BudgetItem";
import Button from "../Button/Button";
import { search } from "../../../utils/Pulasthi/Icons";
import SearchBudgetItem from "../Search/SearchBudgetItem";
import UpdateForm from "../Form/UpdateForm";

function Budget() {

  //here useGlobalContext used to bring globalContext methods
  //these methods are coming from globalContext
  //addBudget method render in form componenet
  const {addBudget,getBudgets,budgets,deleteBudget,updateBudget,getOneBudget,budget} = useGlobalContext();

  const [budgetId, setBudgetId] = useState('');
  // State to track search visibility
  const [searchActive, setSearchActive] = useState(false);
  //const [updateActive, setUpdateActive] = useState(false);

  // const handleUpdate = async() => {
  //   try{
  //       const result = await updateBudget(budgetId);
  //       updateActive(true)
  //   }catch{
  //       alert("update error")
  //       updateActive(false)
  //   }
  // }

  const handleSearch = async() => {
    //if searchbar is empty
    if (budgetId.trim() === '') {
      alert('Please enter a Budget ID.');
      return;
    }
    //handle the getOneBudget() errors locally
    try{
      const result = await getOneBudget(budgetId);
      setSearchActive(true); // Activate search when a valid ID is entered
    }catch(error){
      alert('Budget ID not found.');
      setSearchActive(false);
    }
    // setSearchActive(true); 
    // getOneBudget(budgetId);
  };

  const handleCloseSearch = () => {
    setSearchActive(false); // Deactivate search when the close button is clicked
    setBudgetId(''); // Clear search input
  };
  //useEffect take backend response array to budget component
  //useEffect use wena pradana thanak tama me budgets okkoma display karana functional component eka
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
          {/* <SearchBudgetItem budget={budget} /> */}

        <div className="budget-content">
          <div className="form-container"></div>
          
          {/* {updateActive? (
            <UpdateForm/>
          ):( */}
            // {/* add budget */}
            <div className="budgets">
                <Form/>
            </div>
          {/* )} */}
          
          <div className="update">
            {budget &&<UpdateForm budgetToUpdate={budget}/>}
          </div>

          {/* Conditional rendering based on search state */}
          {/* if searchActive value is true then app shows SearchBudgetItem componenet
          else app shows BudgetItems */}
          {searchActive? (
              //properties inside the angle brackets are going to SearchBudgetItem component as props
              <SearchBudgetItem budget={budget} onClose={handleCloseSearch}/>
          ) : (
            //getbudgets
            <div className="budgets">
                {budgets.map((budget) => (
                    
                    // one functional component access another component
                    <BudgetItem
                        key={budget._id}
                        budgetId={budget.budgetId}
                        month={budget.month}
                        amount={budget.amount}
                        date={budget.date}
                        indicatorColor="var(--color-DarkYellow)"
                        deleteItem={deleteBudget}
                        updateItem={updateBudget}
                    />
                ))}
            </div>
            )}
          </div>
      </InnerLayout>
    </BudgetStyled>
  );
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





