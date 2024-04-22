import React from "react";
import { Link } from "react-router-dom";
import '../CSS/Dasun/Header.css';


function ClientHome() {
    return (
        <div>
        <header>
        <div class="container">
        <h1 class="logo"></h1>

        <nav>
            <ul>
            <li><Link to="/faqCustomer">FAQs</Link></li>
            <li><Link to="/feedbackCustomer">Feedback</Link></li>
            <li><Link to="/blogCustomer">Blogs</Link></li>
            <li><Link to="/messageCustomer">Messages</Link></li>
            </ul>
        </nav>
        </div>
        </header>
        </div>
    )
}

export default ClientHome;