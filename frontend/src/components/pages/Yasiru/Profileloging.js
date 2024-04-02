import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


export default function ProfileLoging() {

    const navigate = useNavigate()


    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Employee ID</Form.Label>
          <Form.Control type="email" placeholder="Employee ID" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="password" placeholder="User Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <button type="submit" class="submit-btn" onClick={()=>navigate('/profile')}>Submit</button>

    
       
      </Form>
    );
  }
  
 