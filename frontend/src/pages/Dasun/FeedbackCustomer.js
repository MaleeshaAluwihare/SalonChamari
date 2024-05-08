import { Link } from "react-router-dom";

const FeedbackCustomer = () => {
    return (
      <div className="feedback">
        <h1>Feedback</h1>

        <br /> <br />

        <Link to="/feedbackCustomer/add"> <button>Add Feedback</button> </Link>

      </div>
    );
  }
  
  export default FeedbackCustomer;