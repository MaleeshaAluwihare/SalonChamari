import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../../css/Maleesha/Footer.css';
import SalonLogo from '../../images/Maleesha/Logo.png';


export default function Footer() {
  return (
    <footer id="dk-footer" className="dk-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-4">
            <div className="dk-footer-box-info">
              <a href="index.html" className="footer-logo">
                <img src={SalonLogo} alt="footer_logo" className="img-fluid" />
              </a>
              <p className="footer-info-text">
                Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.
              </p>
              {/* Footer social links */}
              <div className="footer-social-link">
                <h3>Follow us</h3>
                <ul>
                  <li><a href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebook} className='icon'/></a></li>
                  <li><a href="https://www.tiktok.com"><FontAwesomeIcon icon={faInstagram} className='icon'/></a></li>
                  <li><a href="https://www.instagram.com"><FontAwesomeIcon icon={faTiktok} className='icon'/></a></li>
                </ul>
              </div>
              {/* End Social link */}
            </div>
            {/* End Footer info */}
          </div>
          {/* End Col 1 */}
          {/* Col 2 */}
          <div className="col-md-12 col-lg-8">
            <div className="row">
              {/* Contact Information */}
              <div className="col-md-6">
                <div className="contact-us">
                  <div className="contact-icon">
                    <i className="fa fa-map-o" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="contact-us contact-us-last">
                  <div className="contact-icon">
                    <i className="fa fa-volume-control-phone" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
            {/* End Contact Row */}
            <div className="row">
            <div className="col-md-12 col-lg-6">
                {/* Useful Links */}
                <div className="footer-widget footer-left-widget">
                  <div className="section-heading">
                    <h3>Useful Links</h3>
                    <span className="animate-border border-black"></span>
                  </div>
                  <ul>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Our Work</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Faq</a></li>
                    {/* Move "Give us a call" section here */}
                    <li>
                      <div className="contact-us">
                        <div className="contact-icon">
                          <i className="fa fa-volume-control-phone" aria-hidden="true"></i>
                        </div>
                        <div className="contact-info">
                          <h3>(+94) 71 853 4870</h3>
                          <p>Give us a call</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* End Footer Widget */}
              </div>
              {/* End Col 1 */}
              <div className="col-md-12 col-lg-6">
                {/* Subscribe */}
                <div className="footer-widget">
                  <div className="section-heading">
                    <h3>Subscribe</h3>
                    <span className="animate-border border-black"></span>
                  </div>
                  <p>
                    Reference site about Lorem Ipsum, giving information on its origins, as well.
                  </p>
                  <form action="#">
                    <div className="form-row">
                      <div className="col dk-footer-form">
                        <input type="email" className="form-control" placeholder="Email Address" />
                        <button type="submit"><i className="fa fa-send"></i></button>
                      </div>
                    </div>
                  </form>
                  {/* End form */}
                </div>
                {/* End footer widget */}
              </div>
            </div>
            {/* End Row */}
          </div>
          {/* End Col 2 */}
        </div>
        {/* End Widget Row */}
      </div>
      {/* End Contact Container */}

      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <span>Copyright © 2024, All Right Reserved Salon Chamari</span>
            </div>
            <div className="col-md-6">
              <div className="copyright-menu">
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Terms</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Copyright */}
      {/* Back to top */}
      <div id="back-to-top" className="back-to-top">
        <button className="btn btn-dark" title="Back to Top" style={{ display: 'block' }}>
          <i className="fa fa-angle-up"></i>
        </button>
      </div>
      {/* End Back to top */}
    </footer>
  );
}
