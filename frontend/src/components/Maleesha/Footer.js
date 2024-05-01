import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Styles from '../../css/Maleesha/Footer.module.css';
import SalonLogo from '../../images/Maleesha/Logo.png';


export default function Footer() {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.container}>
        <div className={Styles.row}>
          <div className={Styles.colmd}>
            <div className={Styles.footerboxinfo}>
              <a href="index.html" className={Styles.footerlogo}>
                <img src={SalonLogo} alt="footer_logo" className={Styles.img} />
              </a>
              <p className={Styles.footerinfotext}>
                EXPERIENCE THE ULTIMATE BEAUTY TREATMENT IN A SERENE ENVIRONMENT
              </p>
              {/* Footer social links */}
              <div className={Styles.footersociallink}>
                <h3>Follow us</h3>
                <ul>
                  <li><a href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebook} className={Styles.icon}/></a></li>
                  <li><a href="https://www.tiktok.com"><FontAwesomeIcon icon={faInstagram} className={Styles.icon}/></a></li>
                  <li><a href="https://www.instagram.com"><FontAwesomeIcon icon={faTiktok} className={Styles.icon}/></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </div>
    </footer>
  );
}
