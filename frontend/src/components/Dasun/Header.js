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
            <li><Link href="#">Blogs</Link></li>
            <li><Link href="#">Add Blog</Link></li>
            </ul>
        </nav>
        </div>
        </header>
        </div>
    )
}

export default Header;