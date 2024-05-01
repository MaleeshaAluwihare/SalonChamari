import React,{useState} from "react"
import styled from "styled-components"
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import Button from "../Button/Button";
import { plus } from "../../../utils/Pulasthi/Icons";

function InvItemForm() {

    const {getInvItems}=useGlobalContext();
    //ekin ekata states hadanne nathuwa okkoma column values walata eka state hadala tma me tyenne
    const [inputState, setInputState] = useState({
        itemId: '',
        itemType: '',
        quantity: '',
        date: '',
    })
    //Dstructure to inputState
    const { itemId, itemType, quantity, date, itemPrice } = inputState;
    //...?
    const handleInput = name => e => {
        //setInputState get the whatever we typing in the input
        setInputState({...inputState, [name]: e.target.value})
        // setError('')
    }

    const handleCalculatePrice = () => {
        let price;
        let quan = parseInt(quantity, 10);
        switch(itemType) {
            case "Hair Dryer":
                price = 500;
                break;
            case "Scissors":
                price = 100;
                break;
            case "Curling iron":
                price = 2000;
                break;
            case "Lens":
                price = 10000;
                break;
            case "Tripod":
                price = 8000;
                break;
            default:
                price = 0;
        }
        let itemPrice = quan * price;
        setInputState(prevState => ({ ...prevState, itemPrice })); //create a new state for itemPrice property
    };

    const BASE_URL = "http://localhost:8070/finance/";
    //react event handling 
    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${BASE_URL}update-item-price`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              //Serializes the collected data into a JSON string.
              body: JSON.stringify({
                itemId: itemId,
                itemPrice: itemPrice,
                date: date,
                itemType: itemType
              })
            });
            const data = await response.json();
            console.log('Success:', data);
            // Do something here on success, like clearing the form or showing a success message
          } catch (error) {
            console.error('Error:', error);
          }

          getInvItems()
        //set form to be empty after new budget submission
        // setInputState({
        //     budgetId: '',
        //     month: '',
        //     amount: '',
        //     date: '',
        // })
    }

  return (
    <InvItemFormStyled onSubmit={handleSubmit}>
        
        <div className="input-control">
            <input
                type="text"
                //value is coming from the state
                value={itemId}
                name={'itemId'}
                placeholder="Item ID"
                onChange={handleInput('itemId')}//handleInput parameter should match the name
                required
            />
        </div>
        <div className="selects input-control">
        <select required value={itemType} name="itemType" id="itemType" onChange={handleInput('itemType')} >
                    <option value=""  disabled >Select Option</option>
                    <option value="Hair Dryer">Hair Dryer</option>
                    <option value="Scissors">Scissors </option>
                    <option value="Curling iron">Curling iron</option>
                    <option value="Lens">Lens</option>
                    <option value="Tripod">Tripod</option>
                    
        </select>
        </div>
        <div className="input-control">
            <input
                type="text"
                id="qValue"
                value={quantity}
                name={'quantity'}
                placeholder="Quantity"
                onChange={handleInput('quantity')}
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
        <div className="submit-btn">
            {/* import the Button component */}
            <Button 
                name={'Calculate price'}
                icon={plus}
                bPad={'.8rem 1.6rem'}
                bRad={'30px'}
                bg={'var(--color-lightYellow'}
                color={'#fff'}
                onClick={handleCalculatePrice}
            />
        </div>
        <div className="price-label">
            <label id="itemP">Item price: {itemPrice}</label>
        </div>
    </InvItemFormStyled>
  )
};
//form is a property of styled components
const InvItemFormStyled = styled.form`
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

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-DarkYellow) !important;
            }
        }
    }
`;
export default InvItemForm
