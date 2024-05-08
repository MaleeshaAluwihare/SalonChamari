import React from 'react';
import Styles from '../../css/Maleesha/header.module.css';
import Logo from '../../images/Maleesha/Logo.png';

function Header() {
    return (
        <header className={Styles.header}>

            <img src={Logo} alt="Salon Logo"style={{ width: '130px', height: 'auto' }}/>

            <nav className={Styles.navbar}>
                <a href="/" style={{'--i': 0}}>Home</a>
                <a href="/salon-home" style={{'--i': 2}}>Salon</a>
                <a href="/Studio" style={{'--i': 3}}>Studio</a>
                <a href="#" style={{'--i': 3}}>Event</a>
                <a href="//blog/all" style={{'--i': 3}}>Blog</a>
                <a href="/quote-page" style={{'--i': 3}}>Quotation</a>
                <a href="/faq/all" style={{'--i': 1}}>FAQ</a>
                <a href="#" style={{'--i': 4}}>Profile</a>
            </nav>
        </header>
    );
}

export default Header;
