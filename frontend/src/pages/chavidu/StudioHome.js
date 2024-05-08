import React from "react";
import { Link } from "react-router-dom";
import Header from '../../components/Chavidu/Header';
import SliderSection from "../../components/Chavidu/imageSilder";
import StudioBookingForm from "../../components/Chavidu/studioBookingForm";
import styles from'../../css/chavidu/studioHome.module.css';
import DisplayStudioPackages from "../../components/Chavidu/displayStudioPackage"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

import video from '../../images/chavidu/video.mp4';

function StudioHome() {
    return (
        <div className={styles.studioHome}>
            
            <SliderSection />

            

            <div className={styles.textContainer}>
  <div className={styles.row}>
    <div className={styles.column}>
      <h3 className={styles.animatedText}>Step into our world of light, shadow, and boundless creativity.</h3>
    </div>
  </div>
</div>

            

            <div className={styles.fixedBackgroundSection}>
                <div className={styles.aboutContent}>
                    <h3>Capturing Moments, Crafting Memories since 1998</h3>
                    <p>At Salon Chamari, beauty is more than skin deep—it’s an art form mastered by our expert stylist, <b>Nishan Hathurusinghe</b>. With a tapestry of qualifications, including NVQ Level 4 and Level 5 in beauty, bridal, and hair, Ms. Chamari infuses over 25 years of experience with a touch of innovation to transform every service into a masterpiece.</p>
                    <p>From its inception as a cozy corner for beauty essentials, Nishan Studio has blossomed into a sanctuary for bridal elegance. Responding to the heartfelt wishes of our clientele, we’ve curated a suite of wedding services that weave the essence of your dream day into every detail.</p>
                    <p>As a beacon for brides-to-be, Salon Chamari offers a harmonious blend of professional care, cutting-edge technology, and a nurturing environment. Our doors open to a world where every client is cherished, every treatment is luxurious, and every visit leaves you feeling like royalty.</p>
                    <p>Embrace the Salon Chamari experience—where exceptional beauty services meet affordability and every moment is a step towards the aisle of radiance.</p>
                </div>
            </div>

            <DisplayStudioPackages />

            <div className={styles.locationContainer}>
                <div className={styles.mapContainer}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.843688062924!2d80.39591537401498!3d8.318327291717358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcf44e0824017d%3A0x1c10a76bc564e04!2sSalon%20Chamari!5e0!3m2!1sen!2slk!4v1712595555845!5m2!1sen!2slk"
                        width="800"
                        height="500"
                        style={{ border: "0" }} // Use object notation here
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Salon Chamari Location"
                    ></iframe>
                </div>
                <div className={styles.detailContainer}>
                    <div className={styles.contactInfo}>
                        <p className={styles.title}><FontAwesomeIcon icon={faLocationDot} className={styles.locationIcon} size="6px" />LOCATE US</p>
                        <p>
                            Nishan Studio
                            <br />
                            523/7 DS Senanayake Mawatha
                            <br />
                            Anuradhapura
                        </p>
                    </div>
                    <div className={styles.contactInfo}>
                        <p className={styles.title}><FontAwesomeIcon icon={faPhone} className={styles.locationIcon} size="6px" />CONTACT US</p>
                        <p className={styles.phone}>
                            <span>Phone:</span> +94 767455431
                        </p>
                        <p className={styles.email}>
                            <span>E-mail:</span> NishanStudio.com
                        </p>
                    </div>
                </div>
            </div>

            

        </div>
    );
}

export default StudioHome;
