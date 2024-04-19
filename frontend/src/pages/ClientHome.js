import React from "react";
import { Link } from "react-router-dom";
import '../CSS/Header.css';


function ClientHome() {
    return (
        <div>
        <header>
        <div class="container">
        <h1 class="logo"></h1>

        <nav>
            <ul>
            <li><Link to="#">FAQs</Link></li>
            <li><Link to="/feedbackCustomer">Feedback</Link></li>
            <li><Link to="#">Blogs</Link></li>
            <li><Link to="#">Messages</Link></li>
            </ul>
        </nav>
        </div>
        </header>
        </div>
    )
}

export default ClientHome;