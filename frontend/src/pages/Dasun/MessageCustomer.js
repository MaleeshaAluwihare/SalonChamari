import { Link } from "react-router-dom";

const MessageCustomer = () => {
    return (
      <div className="message">
        <h1>Message</h1>

        <br /> <br />

        <Link to="/messageCustomer/add"> <button>Send Message</button> </Link>

      </div>
    );
  }
  
  export default MessageCustomer;