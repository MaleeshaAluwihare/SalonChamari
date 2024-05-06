import React,{useState} from "react"
import styled from "styled-components"
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import Button from "../Button/Button";
import { plus } from "../../../utils/Pulasthi/Icons";

function Form() {

    const {addBudget,getBudgets,budgets}=useGlobalContext();
    //ekin ekata states hadanne nathuwa okkoma column values walata eka state hadala tma me tyenne
    const [inputState, setInputState] = useState({
        budgetId: '',
        month: '',
        amount: '',
        date: '',
    })
    //Dstructure to inputState
    const { budgetId, month, amount, date } = inputState;
    //...?
    const handleInput = name => e => {
        //setInputState get the whatever we typing in the input
        setInputState({...inputState, [name]: e.target.value})
        // setError('')
    }
    const monthAlreadyHasBudget = (selectedMonth) => {
        return budgets.some(budget => budget.month === selectedMonth);
    };

    const handleSubmit = e => {
        e.preventDefault()

        if (!validateBudgetId(budgetId)) {
            alert('Invalid budget ID. Please enter a valid ID starting with "b" followed by 4 digits.');
            return;
        }
        if (monthAlreadyHasBudget(month)) {
            alert('A budget for this month already exists. Please choose another month.');
            return;
        }
        //Send Entered values
        addBudget(inputState)
        getBudgets()
        //set form to be empty after new budget submission
        setInputState({
            budgetId: '',
            month: '',
            amount: '',
            date: '',
        })
    }
    // Function to validate budget ID using regex
    const validateBudgetId = (id) => {
        const pattern = /^b\d{4}$/; // regex pattern: starts with "b" followed by 4 digits
        return pattern.test(id);
    };

  return (
    <FormStyled onSubmit={handleSubmit}>
        {/* later do a validation to alert user to enter unique budgetId */}
        <div className="input-control">
            <input
                type="text"
                //value is coming from the state
                value={budgetId}
                name={'budgetId'}
                placeholder="Budget ID"
                onChange={handleInput('budgetId')}//handleInput parameter should match the name
                required
            />
        </div>
        <div className="selects input-control">
        <select required value={month} name="month" id="month" onChange={handleInput('month')} >
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
                name={'amount'}
                placeholder="Amount"
                onChange={handleInput('amount')}
                required
            />
        </div>
        <div className="input-control">
            <ReactDatePicker
                id='date'
                placeholderText='Enter A Date'
                selected={date}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => {
                    setInputState({...inputState, date: date})
                }}
                required
            />    
        </div>
        <div className="submit-btnhto">
            {/* import the Button component */}
            <Button 
                name={'Add Budget'}
                icon={plus}
                bPad={'.8rem 1.6rem'}
                bRad={'30px'}
                bg={'var(--color-lightYellow'}
                color={'#fff'}
            />
        </div>
    </FormStyled>
  )
};
//form is a property of styled components
const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btnhto{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-DarkYellow) !important;
            }
        }
    }
`;
export default Form
