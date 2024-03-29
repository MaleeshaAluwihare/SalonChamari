import React, { useState } from 'react';
import '../../css/Maleesha/header.css';

const Header = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <header className="header">
            <a href="#" className="logo">logo</a>

            <input type="checkbox" id="check" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />

            <label htmlFor="check" className="icons">
                <i className='bx bx-menu' id="menu-icon" onClick={() => setIsChecked(true)}></i>
                <i className='bx bx-x' id="close-icon" onClick={() => setIsChecked(false)}></i>
            </label>

            <nav className={`navbar ${isChecked ? 'active' : ''}`}>
                <a href="#" style={{ '--i': 0 }}>Home</a>
                <a href="#" style={{ '--i': 2 }}>Explore</a>
                <a href="Gallery.html" style={{ '--i': 3 }}>Gallery</a>
                <a href="#" style={{ '--i': 1 }}>About</a>
                <a href="#" style={{ '--i': 4 }}>Contact</a>
            </nav>
        </header>
    );
};

export default Header;
