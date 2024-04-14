import React from "react";
import { Link } from "react-router-dom";
import '../../CSS/Header.css';


function Header() {
    return (
        <div>
        <header>
        <div class="container">
        <h1 class="logo"></h1>

        <nav>
            <ul>
            <li><Link to="/faq/all">FAQs</Link></li>
            <li><Link to="/faq/add">Add FAQ</Link></li>
            <li><Link to="#">Blogs</Link></li>
            <li><Link to="#">Add Blog</Link></li>
            <li><Link to="/CustomerMessages/all">Messages</Link></li>
            <li><Link to="/feedback/all">Feedbacks</Link></li>
            </ul>
        </nav>
        </div>
        </header>
        </div>
    )
}

export default Header;