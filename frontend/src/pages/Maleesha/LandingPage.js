import React, { useEffect } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Styles from "../../css/Maleesha/LandingPage.module.css";
import salonLogo from '../../images/Maleesha/Logo.png';
import studioLogo from '../../images/Maleesha/studioLogo.png';
import salonImg from '../../images/Maleesha/Saloon.jpg';
import studioImage from '../../images/Maleesha/StudioImage.jpg';
import eventImage from '../../images/Maleesha/EventImage.jpg';
import { useNavigate } from "react-router-dom";

export default function LandingPage() {

    const navigate = useNavigate();

    const handleSalonClick = () => {
        navigate('/salon-home');
      };
    
      const handleStudioClick = () => {
        navigate('/studio-home');
      };
    
      const handleEventClick = () => {
        navigate('/event-home');
      };
    
    const [text] = useTypewriter({
        words: ['Beauty', 'Photography', 'Event Planing'],
        loop: true,
        typeSpeed: 120,
        deleteSpeed: 50,
    });

    const handleExploreClick = () => {
        window.scrollTo({
            top: window.pageYOffset + 650,
            behavior: 'smooth'
        });
    }

    const handleBackClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        const handleScroll = () => {
            const images = document.querySelectorAll('.salonImageBox');
            const triggerBottom = window.innerHeight / 5 * 4;

            images.forEach(image => {
                const imageTop = image.getBoundingClientRect().top;
                if (imageTop < triggerBottom) {
                    image.classList.add('show');
                } else {
                    image.classList.remove('show');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={Styles.mainContainer}>
            <div className={Styles.contentContainer}>
                <div className={Styles.contentBox}>
                    <div className={Styles.logoBox}>
                        <img src={salonLogo} className={Styles.logoImage} alt="Salon Logo" />
                    </div>
                    <div className={Styles.paragraphContainer}>
                        <p>Every moment is a brushstroke on the canvas of life, </p>
                        <p>We specialize in crafting masterpieces. From the delicate strokes of our salon</p> 
                        <p>artists to the vivid snapshots captured by our photographers,</p> 
                        <p>and the grandeur of our event planners, every experience is a legacy in the making.</p>
                    </div>
                    <br></br>
                    <h1 style={{ margin: '20px 0' }}>
                        Exceptional {' '}
                        <span style={{ fontWeight: 'bold', color: '#FFCF00' }}>
                            {text}
                        </span>
                        <span style={{ color: 'white' }}>
                            <Cursor cursorStyle='|' />
                        </span>
                        {' '} Expertise.
                    </h1>
                    <button className={Styles.exploreBtn} onClick={handleExploreClick}>Explore</button>
                </div>
            </div>
            <div className={Styles.salonImageContainer}>
                <div className={Styles.salonImageBox}>
                     <p className={Styles.salonText}>A whole new world, a whole new look</p>
                     <button onClick={handleSalonClick} className={Styles.visitPageBtn1}>Visit Page</button>                     
                     <img src= {salonImg} alt= "salonImage" className={Styles.salonImage}></img>
                </div>
                <div className={Styles.salonImageBox}>
                     <p className={Styles.studioText}> Capturing the best moments for you </p>
                     <button onClick={handleStudioClick} className={Styles.visitPageBtn2}>Visit Page</button>
                     <img src= {studioImage} alt= "salonImage" className={Styles.salonImage}></img>
                </div>
                <div className={Styles.salonImageBox}>
                     <p className={Styles.eventText}> Your Professional Dream Maker </p>
                     <button onClick={handleEventClick} className={Styles.visitPageBtn3}>Visit Page</button>
                     <img src= {eventImage} alt= "salonImage" className={Styles.salonImage}></img>   
                </div>
            </div>
            <div className={Styles.studiologoImageContainer}>
                <img src={studioLogo} className={Styles.studiologoImage} alt="Studio Logo" />
            </div>
            <div className={Styles.studioTextContainer}>
                <p>Freeze time and immortalize your cherished memories with our expert photography services.</p>
                <p>Whether it's a milestone celebration, a tender family portrait, or a corporate event, </p>
                <p>our lens captures the essence of every moment, preserving it for generations to come.</p>
            </div>
            <button className={Styles.backBtn} onClick={handleBackClick}>Go Back</button>
        </div>
    );
}
