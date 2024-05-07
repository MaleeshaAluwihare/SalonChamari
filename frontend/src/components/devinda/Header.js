import React from 'react';
import '../../css/Devinda/header.css';
const Header = () => {
  return (
    <header className="header">
      <nav className="menu">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">Salon</a></li>
          <li><a href="/">Studio</a></li>
          <li><a href="/packages">Events</a></li>
          <li><a href="/">Gallery</a></li>
          <li><a href="/">Blog</a></li>
          <li><a href="/">Profile</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;