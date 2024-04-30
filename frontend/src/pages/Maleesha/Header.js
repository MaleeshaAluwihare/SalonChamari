import React from 'react';
import '../../css/Maleesha/header.css';
import Logo from '../../images/Maleesha/Logo.png';

function Header() {
    return (
        <header className="header">
            <a href={Logo} className="logo">logo</a>

            <input type="checkbox" id="check" />

            <label htmlFor="check" className="icons">
                <i className='bx bx-menu' id="menu-icon"></i>
                <i className='bx bx-x' id="close-icon"></i>
            </label>

            <nav className="navbar">
                <a href="/salon-home" style={{'--i': 0}}>Home</a>
                <a href="#" style={{'--i': 2}}>Gallery</a>
                <a href="#" style={{'--i': 3}}>Blog</a>
                <a href="/quote-page" style={{'--i': 3}}>Quotation</a>
                <a href="#" style={{'--i': 1}}>FAQ</a>
                <a href="#" style={{'--i': 4}}>Contact</a>
            </nav>
        </header>
    );
}

export default Header;
