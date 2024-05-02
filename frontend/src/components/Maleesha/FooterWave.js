import React from "react";
import '../../css/Maleesha/FooterWave.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import SalonLogo from '../../images/Maleesha/Logo.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>

      <div className="logo-container">
        <img src={SalonLogo} alt="Salon Logo" className="salon-logo" />
      </div>

      <div className="social-icons">
        <a href="https://www.facebook.com">
          <FontAwesomeIcon icon={faFacebook} className="icon" />
        </a>
        <a href="https://www.tiktok.com">
          <FontAwesomeIcon icon={faTiktok} className="icon" />
        </a>
        <a href="https://www.instagram.com">
          <FontAwesomeIcon icon={faInstagram} className="icon" />
        </a>
      </div>

      <div className="page-links">
        <a href="/home">HOME</a>
        <a href="/services">SERVICES</a>
        <a href="/blog">BLOG</a>
        <a href="/faq">FAQ</a>
      </div>

      <hr></hr>

      <p>©2024 Salon Chamari | All Rights Reserved</p>
    </footer>
  );
}
