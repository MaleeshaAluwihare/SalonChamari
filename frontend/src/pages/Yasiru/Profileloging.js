import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'; 


export default function ProfileLoging() {

    const navigate = useNavigate()

    const [value,setvalue]=useState({
      Employee_ID:'',
      Name:''
    })

    const handleSubmit = (event) => {
      event.preventDefault()
      axios.post("/SalonEmp/add",ProfileLoging)
      .then(res => {
        console.log(res);
        navigate('/')
      })
      

    }
    return (
      <div className='d-flex justify-cotent-center align-iems'>
      <Form onSubmit={handleSubmit}>
      <div>
        <label htmlfor="Employee ID">Employee_ID:</label>
        <input type='Employee ID' name="Employee ID" autoComplete='off' placeholder='Ener employee ID'
       onChange={(e)=> setvalue({...value,Employee_ID:e.target.value})} className='form-control-rounded-0'/>
      </div>

      <div>
        <label htmlfor="User Name">Name:</label>
        <input type='User name' name="Name" autoComplete='off' placeholder='Enter your Name'
           onChange={(e)=> setvalue({...value,Name:e.target.value})}  className='form-control-rounded-0'/>
      </div>
        <button type="submit" class="submit-btn" onClick={()=>navigate('/profile')}>Submit</button>
        
    
       
      </Form>
      </div>
    );
  }

 