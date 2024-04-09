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
            <li><a href="/faq/all">FAQs</a></li>
            <li><a href="/faq/add">Add FAQ</a></li>
            <li><a href="#">Blogs</a></li>
            <li><a href="#">Add Blog</a></li>
            </ul>
        </nav>
        </div>
        </header>
        </div>
    )
}

export default Header;