import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import Button from "../Button/Button";
import { close, plus, update } from "../../../utils/Pulasthi/Icons";
                
                     //budgetToUpdate prop come from Budget componenet
function UpdateForm({ budgetToUpdate,onClose }) {
  const { updateBudget,budgets } = useGlobalContext();

  // State to manage form inputs
  const [inputState, setInputState] = useState({
    budgetId: "",
    month: "",
    amount: "",
    date: new Date(),
  });

  // Destructure inputState
  const { budgetId, month, amount, date } = inputState;

  // useEffect use to update the inputState state when budgetToUpdate object changes
  useEffect(() => {
    //check budgetToUpdate is not null or undefined before accessing its properties
    if (budgetToUpdate?.budgetId) {
      setInputState({
        budgetId: budgetToUpdate.budgetId || "",
        month: budgetToUpdate.month || "",
        amount: budgetToUpdate.amount || "",
        date: budgetToUpdate.date ? new Date(budgetToUpdate.date) : new Date(),
      });
    }
  }, [budgetToUpdate]); //here budgetToUpdate is a dependency array

  // Handle input change
  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  // Handle date change
  const handleDateChange = (date) => {
    setInputState({ ...inputState, date });
  };

  //validation
  const monthAlreadyHasBudget = (selectedMonth) => {
    return budgets.some(budget => budget.month === selectedMonth);
  };

  const validateBudgetAmount = (amount) => {
    const regex = /^[0-9\b]+$/; //allow only digits
    return regex.test(amount);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (monthAlreadyHasBudget(month)) {
      alert('A budget for this month already exists. Please choose another month.');
      return;
    }

    if (!validateBudgetAmount(amount)) {
      alert('Enter only the numbers for amount');
      return;
    }
    // Call updateBudget method from global context
    updateBudget(budgetToUpdate?.budgetId,inputState);
    // Clear form fields after submission
    setInputState({
      budgetId: "",
      month: "",
      amount: "",
      date: "",  //new Date() ;
    });
  };

  return (
    <FormStyled onSubmit={handleSubmit}>

      <div className="heading">
        <h2>Update Form</h2>
      </div>
      <div className="input-control">
        <input
          type="text"
          value={budgetId}
          name="budgetId"
          placeholder="Budget ID"
          onChange={handleInput("budgetId")}
          required
          disabled // Disable editing of budget ID
        />
      </div>
      <div className="selects input-control">
        <select required value={month} name="month" id="month" onChange={handleInput("month")}>
            <option value=""  disabled >Select Option</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>  
            <option value="July">July</option>  
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          
        </select>
      </div>
      <div className="input-control">
        <input
          type="text"
          value={amount}
          name="amount"
          placeholder="Amount"
          onChange={handleInput("amount")}
          required
        />
      </div>
      <div className="input-control">
        <ReactDatePicker
          id="date"
          placeholderText="Enter A Date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={handleDateChange}
          required
        />
      </div>
      <div className="button-container">
        <div className="submit-btn">
          <Button
            name="Save" 
            icon={update}
            bPad=".8rem 1.6rem"
            bRad="30px"
            bg="var(--color-lightYellow)"
            color="#fff"
          />
        </div>
        <div className="submit-btn1">
          <Button
            name="Close"
            icon={close}
            bPad=".8rem 1.6rem"
            bRad="30px"
            bg="var(--color-lightRed)"
            color="#fff"
            onClick={onClose}
          />
        </div>
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  h2 {
      margin-bottom: -10px; 
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .button-container {
    display: flex;
    align-items: center; 
    justify-content: space-around;  /*Distributes space evenly around items */
   }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var( --color-DarkYellow) !important;
      }
    }
  }
  .submit-btn1 {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-darkRed) !important;
      }
    }
  }
`;

export default UpdateForm;
