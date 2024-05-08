import React, { useEffect, useRef } from 'react';
import Styles from '../../css/Maleesha/Homepage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import ServiceList from '../../components/Maleesha/ServiceList';
import Footer from '../../components/Maleesha/Footer.js';
import image1 from '../../images/Maleesha/homeimg1.jpg';
import image2 from '../../images/Maleesha/homeimg2.jpg';
import image3 from '../../images/Maleesha/homeimg3.JPG';
import image4 from '../../images/Maleesha/homeimg4.jpg';
import image5 from '../../images/Maleesha/homeimg5.jpg';
import video1 from '../../video/HomeVideo1.mp4';
//import video2 from '../../video/HomeVideo2.mp4';
import openHourIcon from '../../images/Maleesha/opening-hours-icon.png';
import experienceIcon from '../../images/Maleesha/experience-icon.png';
import serviceCompleteIcon from '../../images/Maleesha/service-complete-icon.png';
import staffIcon from '../../images/Maleesha/staff-icon.png';
import Header from './Header.js';


export default function SalonHome() {

    const videoRef = useRef(null);
    
    useEffect(() => {
        const currentVideoRef = videoRef.current;
        
        // Function to start playing the video
        const playVideo = () => {
            if (videoRef.current) {
                videoRef.current.play();
            }
        };
    
        // Function to restart the video when it ends
        const handleEnded = () => {
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
            }
        };
    
        // Event listener to restart the video when it ends
        videoRef.current.addEventListener('ended', handleEnded);
    
        // Add event listener for user interaction to trigger video playback
        const handleUserInteraction = () => {
            playVideo();
            // Remove the event listener after the first user interaction
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
        };
    
        // Add event listeners for user interaction
        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('keydown', handleUserInteraction);
    
        // Cleanup event listeners
        return () => {
            if (currentVideoRef) {
                currentVideoRef.removeEventListener('ended', handleEnded);
            }
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
        };
    }, []);

    return (
        <div className={Styles.homepage}>
            <div className={Styles.headercontainer}>
                <Header/>
            </div>
            <div className={Styles.slidecontainer}>
                <div className={Styles.slidebackground}>
                    <img src={image1} alt="Background 1" className={Styles.slideimage} />
                    <img src={image2} alt="Background 2" className={Styles.slideimage} />
                    <img src={image3} alt="Background 3" className={Styles.slideimage} />
                    <img src={image4} alt="Background 4" className={Styles.slideimage} />
                    <img src={image5} alt="Background 5" className={Styles.slideimage} />

                </div>
                <div className={Styles.welcomecontent}>
                    <p>RELAX IN STYLE, LEAVE WITH SMILE</p>
                    <h1>WELCOME TO SALON CHAMARI</h1>
                    <p>EXPERIENCE THE ULTIMATE BEAUTY TREATMENT IN A SERENE ENVIORNMENT</p>
                </div>
            </div>
            <div className={Styles.infromationContainer}>
                    <div className={Styles.welcomeContainer}>
                        <p className={Styles.welcometext1}>We make sure we serve</p><br /><p className={Styles.welcometext2}><b>The best of our service</b></p>
                    </div>
                    <div className={Styles.containers}>
                        <div className={Styles.container1}>
                            <h5>ENRICH</h5><br />
                            <p>Enrich the lives of our community by empowering them to unveil their innate beauty and cultivate unwavering confidence. Our mission is to inspire every individual to embrace life's journey with grace.</p>
                        </div>
                        <div className={Styles.container2}>
                            <h5>ELEVATE</h5><br />
                            <p>Elevate the standards of beauty and self-care within our community, encouraging individuals to indulge in personalized grooming experiences that nurture their well-being and elevate their spirits</p>
                        </div>
                        <div className={Styles.container3}>
                            <h5>TRANSFORM</h5><br />
                            <p>Transform the way you perceive beauty and grooming. Let us guide you on a journey to discover your true radiance, empowering you to embrace every moment with poise and vitality</p>
                        </div>
                    </div>
            </div>
            <div className={Styles.serviceList}>
                <ServiceList/>
            </div>

            <div className={Styles.videoContainer}>
                <video  ref={videoRef} width="100%" height="auto" autoPlay loop muted>
                    <source src={video1} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className={Styles.fixedbackgroundsection}>
                <div className={Styles.aboutcontent}>
                    <h3>Discover Beauty and Elegance</h3>
                    <p>At Salon Chamari, beauty is more than skin deep—it’s an art form mastered by our expert stylist, <b>B. Chamari Kaushalya</b>. With a tapestry of qualifications, including NVQ Level 4 and Level 5 in beauty, bridal, and hair, Ms. Chamari infuses over 25 years of experience with a touch of innovation to transform every service into a masterpiece.</p>
                    <p>From its inception as a cozy corner for beauty essentials, Salon Chamari has blossomed into a sanctuary for bridal elegance. Responding to the heartfelt wishes of our clientele, we’ve curated a suite of wedding services that weave the essence of your dream day into every detail.</p>
                    <p>As a beacon for brides-to-be, Salon Chamari offers a harmonious blend of professional care, cutting-edge technology, and a nurturing environment. Our doors open to a world where every client is cherished, every treatment is luxurious, and every visit leaves you feeling like royalty.</p>
                    <p>Embrace the Salon Chamari experience—where exceptional beauty services meet affordability and every moment is a step towards the aisle of radiance.</p>
                </div>
            </div>
            <div className={Styles.infoContainer}>
                <div className={Styles.staffinfo}>
                    <img src={staffIcon} className={Styles.Icon} alt='staffIcon'/>
                    <p className={Styles.infop}>15+<br/> 
                    SKILLED STAFF</p>
                </div>
                <div className={Styles.experienceinfo}>
                    <img src={experienceIcon} className={Styles.Icon} alt='experienceIcon'/>
                    <p className={Styles.infop}>20 YEARS<br/>
                    OF EXPERIENCE</p>
                </div>
                <div className={Styles.servicesinfo}>
                    <img src={serviceCompleteIcon} className={Styles.Icon} alt='serviceCompleteIcon'/>
                    <p className={Styles.infop}>10000+<br/>
                    SERVICES COMPLETED</p>
                </div>
                <div className={Styles.openinfo}>
                    <img src={openHourIcon} className={Styles.Icon} alt='openHourIcon'/>
                    <p className={Styles.infop}>9AM - 6PM <br/>
                    DAILY SERVICE</p>
                </div>
            </div>

            {/* <div className={Styles.videoContainer}>
                <video  ref={videoRef} width="100%" height="auto" autoPlay loop muted>
                    <source src={video2} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div> */}

            <div className={Styles.locationContainer}>
                <div className={Styles.mapContainer}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.843688062924!2d80.39591537401498!3d8.318327291717358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcf44e0824017d%3A0x1c10a76bc564e04!2sSalon%20Chamari!5e0!3m2!1sen!2slk!4v1712595555845!5m2!1sen!2slk"
                        width="800"
                        height="500"
                        style={{ border: "0" }} 
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Salon Chamari Location"
                    ></iframe>
                </div>
                <div className={Styles.detailContainer}>
                    <div className={Styles.contactInfo}>
                        <p className={Styles.title}><FontAwesomeIcon icon={faLocationDot} className={Styles.locationicon}/>LOCATE US</p>
                        <p>
                            Salon Chamari
                            <br />
                            523/7 DS Senanayake Mawatha
                            <br />
                            Anuradhapura
                        </p>
                    </div>
                    <div className={Styles.contactInfo}>
                        <p className={Styles.title}><FontAwesomeIcon icon={faPhone} className={Styles.locationicon}/>CONTACT US</p>
                        <p className={Styles.phone}>
                            <span>Phone:</span> +94 767455431
                        </p>
                        <p className={Styles.email}>
                            <span>E-mail:</span> SalonChamari@gmail.com
                        </p>
                    </div>
                </div>
            </div>
            <div className={Styles.footer}>
                <Footer/>
            </div>

        </div>
    );
};
