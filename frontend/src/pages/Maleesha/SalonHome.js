import React, { useEffect, useRef } from 'react';
import '../../css/Maleesha/Homepage.css';
import ServiceList from '../../components/Maleesha/ServiceList';
import Footer from '../../components/Maleesha/Footer.js';
import image1 from '../../images/Maleesha/homeimg1.jpg';
import image2 from '../../images/Maleesha/homeimg2.jpg';
import image3 from '../../images/Maleesha/homeimg5.jpg';
import video from '../../video/HomeVideo1.mp4';


export default function SalonHome() {

    const videoRef = useRef(null);

    useEffect(() => {
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

        // Start playing the video when it comes into view
        playVideo();

        return () => {
            // Cleanup
            videoRef.current.removeEventListener('ended', handleEnded);
        };
    }, []);

    return (
        <div className="homepage">
            <div className="parallax-container">
                <div className="parallax-background">
                    <img src={image1} alt="Background 1" className="slide-image" />
                    <img src={image2} alt="Background 2" className="slide-image" />
                    <img src={image3} alt="Background 3" className="slide-image" />
                </div>
                <div className="parallax-content">
                    <h1>Welcome to Our Beauty Salon</h1>
                    <p>Experience the ultimate beauty treatments in a serene environment.</p>
                </div>
            </div>
            <div className='infromationContainer'>
                <div className='welcomeContainer'>
                    <p className='welcome-text1'>We make sure we serve</p><br /><p className='welcome-text2'><b>The best of our service</b></p>
                </div>
                <div className='containers'>
                    <div className='container1'>
                        <h5>ENRICH</h5><br />
                        <p>Enrich the lives of our community by empowering them to unveil their innate beauty and cultivate unwavering confidence. Our mission is to inspire every individual to embrace life's journey with grace.</p>
                    </div>
                    <div className='container2'>
                        <h5>ELEVATE</h5><br />
                        <p>Elevate the standards of beauty and self-care within our community, encouraging individuals to indulge in personalized grooming experiences that nurture their well-being and elevate their spirits</p>
                    </div>
                    <div className='container3'>
                        <h5>TRANSFORM</h5><br />
                        <p>Transform the way you perceive beauty and grooming. Let us guide you on a journey to discover your true radiance, empowering you to embrace every moment with poise and vitality</p>
                    </div>
                </div>
            </div>
            <div className='serviceList'>
                <ServiceList/>
            </div>

            <div className='videoContainer'>
                <video  ref={videoRef} width="100%" height="auto" autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className='locationContainer'>
                <div className='mapContainer'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.843688062924!2d80.39591537401498!3d8.318327291717358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcf44e0824017d%3A0x1c10a76bc564e04!2sSalon%20Chamari!5e0!3m2!1sen!2slk!4v1712595555845!5m2!1sen!2slk"
                        width="800"
                        height="500"
                        style={{ border: "0" }} // Use inline style object
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <div className='detailContainer'>
                    <div className='contactInfo'>
                        <p className='title'><u>LOCATE US</u></p>
                        <p>
                            Salon Chamari
                            <br />
                            523/7 DS Senanayake Mawatha
                            <br />
                            Anuradhapura
                        </p>
                    </div>
                    <div className='contactInfo'>
                        <p className='title'><u>CONTACT US</u></p>
                        <p className='phone'>
                            <span>Phone:</span> +94 767455431
                        </p>
                        <p className='email'>
                            <span>E-mail:</span> SalonChamari@gmail.com
                        </p>
                    </div>
                </div>
            </div>
            <div className='footer'>
                <Footer/>
            </div>

        </div>
    );
};
