import React,{useState} from "react"
import styled from "styled-components"
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../../context/Pulasthi/globalContext";
import Button from "../Button/Button";
import { plus } from "../../../utils/Pulasthi/Icons";

function EmpSalaryForm() {

    const {getEmployeeDetails}=useGlobalContext();
    //ekin ekata states hadanne nathuwa okkoma column values walata eka state hadala tma me tyenne
    const [inputState, setInputState] = useState({
        empId: '',
        jobRole: '',
        attendance: '',
        date: '',
    })
    //Dstructure to inputState
    const { empId, jobRole, attendance, date, empSalary } = inputState;
    //...?
    const handleInput = name => e => {
        //setInputState get the whatever we typing in the input
        setInputState({...inputState, [name]: e.target.value})
        // setError('')
    }


    //calculate item price
    const handleCalculateSalary = () => {
        let dailySalary;
        let attend = parseInt(attendance, 10);
        
        const regex = /^[0-9\b]+$/;//allow only digits
        if (attend > 30 || !regex.test(attendance)) {
            alert("Not a valid attendance for a month");
            return; 
        }

        switch(jobRole) {
            case "Cameraman":
                dailySalary = 5500;
                break;
            case "Studio assistant":
                dailySalary = 2500;
                break;
            case "Barber":
                dailySalary = 2000;
                break;
            case "Hairstylist":
                dailySalary = 6000;
                break;
            case "Beautician":
                dailySalary = 8000;
                break;
            default:
                dailySalary = 0;
        }
        let empSalary = attend * dailySalary;
        setInputState(prevState => ({ ...prevState, empSalary })); //create a new state for empSalary property
    };

    const BASE_URL = "http://localhost:8070/finance/";
    //react event handling 
    const handleSubmit = async(e) => {
        e.preventDefault()

        //method for update invItem price and add it into expenses
        try {
            const response = await fetch(`${BASE_URL}update-emp-salary`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              //Serializes the collected data into a JSON string.
              body: JSON.stringify({
                empId: empId,
                empSalary: empSalary,
                date: date,
                jobRole: jobRole
              })
            });
            const data = await response.json();
            console.log('Success:', data);
            
          } catch (error) {
            console.error('Error:', error);
          }

          getEmployeeDetails()
        
    }

  return (
    <EmpSalaryFormStyled onSubmit={handleSubmit}>
        <div className="heading">
            <h2>Employee Salary Calculator</h2>
        </div>
        
        <div className="input-control">
            <input
                type="text"
                //value is coming from the state
                value={empId}
                name={'empId'}
                placeholder="Employee ID"
                onChange={handleInput('empId')}//handleInput parameter should match the name
                required
            />
        </div>
        <div className="selects input-control">
        <select required value={jobRole} name="jobRole" id="jobRole" onChange={handleInput('jobRole')} >
                    <option value=""  disabled >Select Job Role</option>
                    <option value="Cameraman">Cameraman</option>
                    <option value="Studio assistant">Studio assistant </option>
                    <option value="Barber">Barber</option>
                    <option value="Hairstylist">Hairstylist</option>
                    <option value="Beautician">Beautician</option>
                    
        </select>
        </div>
        <div className="input-control">
            <input
                type="text"
                id="aValue"
                value={attendance}
                name={'attendance'}
                placeholder="Attendance"
                onChange={handleInput('attendance')}
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
                name={'Calculate Salary'}
                icon={plus}
                bPad={'.8rem 1.6rem'}
                bRad={'30px'}
                bg={'var(--color-lightYellow'}
                color={'#fff'}
                onClick={handleCalculateSalary}
            />
        </div>
        <div className="price-label">
            <label id="empS">Employee Salary: {empSalary}</label>
        </div>
    </EmpSalaryFormStyled>
  )
};
//form is a property of styled components
const EmpSalaryFormStyled = styled.form`
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
            margin-left:100px;
            &:hover{
                background: var(--color-DarkYellow) !important;
            }
        }
        
    }
`;
export default EmpSalaryForm
