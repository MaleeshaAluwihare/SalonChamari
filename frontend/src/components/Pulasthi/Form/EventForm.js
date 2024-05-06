import React,{useState} from "react"
import styled from "styled-components"
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import Button from "../Button/Button";
import { plus } from "../../../utils/Pulasthi/Icons";

function EventForm() {

    const {getEventDetails}=useGlobalContext();
    //ekin ekata states hadanne nathuwa okkoma column values walata eka state hadala tma me tyenne
    const [inputState, setInputState] = useState({
        objectId: '',
        packageType: '',
        date: '',
        profit:'',
        cost:''
    })
    //Dstructure to inputState
    const { objectId, packageType, date, profit, cost } = inputState;
    //...?
    const handleInput = name => e => {
        //setInputState get the whatever we typing in the input
        setInputState({...inputState, [name]: e.target.value})
        // setError('')
    }


    const BASE_URL = "http://localhost:8070/finance/";
    //react event handling 
    const handleSubmit = async(e) => {
        e.preventDefault()

        //method for add cost and profit to expenses and incomes
        try {
            const response = await fetch(`${BASE_URL}add-eventPackages`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              //Serializes the collected data into a JSON string.
              body: JSON.stringify({
                objectId: objectId,
                profit: profit,
                cost: cost,
                date: date,
                packageType: packageType
              })
            });
            const data = await response.json();
            console.log('Success:', data);
            alert("cost and profit are added to expenses and incomes")
            
          } catch (error) {
            console.error('Error:', error);
          }

          getEventDetails()
        
    }

  return (
    <EventFormStyled onSubmit={handleSubmit}>
        
        <div className="input-control">
            <input
                type="text"
                //value is coming from the state
                value={objectId}
                name={'objectId'}
                placeholder="Event ID"
                onChange={handleInput('objectId')}//handleInput parameter should match the name
                required
            />
        </div>
        <div className="selects input-control">
        <select required value={packageType} name="packageType" id="packageType" onChange={handleInput('packageType')} >
                    <option value=""  disabled >Select Option</option>
                    <option value="Platinum">Platinum</option>
                    <option value="Gold">Gold </option>
                    <option value="Silver">Silver</option>
                    <option value="bronze">bronze</option>
                    
        </select>
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

        <div className="input-control">
            <input
                type="text"
                id="pValue"
                value={profit}
                name={'profit'}
                placeholder="Profit for the package"
                onChange={handleInput('profit')}
                required
            />
        </div>

        <div className="input-control">
            <input
                type="text"
                id="cValue"
                value={cost}
                name={'cost'}
                placeholder="Cost for the package"
                onChange={handleInput('cost')}
                required
            />
        </div>

        <div className="submit-btn">
            {/* import the Button component */}
            <Button 
                name={'Submit'}
                icon={plus}
                bPad={'.8rem 1.6rem'}
                bRad={'30px'}
                bg={'var(--color-lightYellow'}
                color={'#fff'}
            />
        </div>

    </EventFormStyled>
  )
};
//form is a property of styled components
const EventFormStyled = styled.form`
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
export default EventForm
