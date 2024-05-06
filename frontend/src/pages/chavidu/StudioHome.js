import React from "react";
import { Link } from "react-router-dom";
import Header from '../../components/Chavidu/Header';
import SliderSection from "../../components/Chavidu/imageSilder";
import WordSlider1 from "../../components/Chavidu/wordslider1";
import StudioBookingForm from "../../components/Chavidu/studioBookingForm";
import '../../css/chavidu/studioHome.css';
import DisplayStudioPackages from "../../components/Chavidu/displayStudioPackage"

import video from '../../images/chavidu/video.mp4';

function StudioHome() {
    return (
        <div className="studio-home">
            
            <SliderSection />
            <WordSlider1 />
            <div className='fixed-background-section'>
                <div className='about-content'>
                    <h3>Discover Beauty and Elegance</h3>
                    <p>At Salon Chamari, beauty is more than skin deep—it’s an art form mastered by our expert stylist, <b>B. Chamari Kaushalya</b>. With a tapestry of qualifications, including NVQ Level 4 and Level 5 in beauty, bridal, and hair, Ms. Chamari infuses over 25 years of experience with a touch of innovation to transform every service into a masterpiece.</p>
                    <p>From its inception as a cozy corner for beauty essentials, Salon Chamari has blossomed into a sanctuary for bridal elegance. Responding to the heartfelt wishes of our clientele, we’ve curated a suite of wedding services that weave the essence of your dream day into every detail.</p>
                    <p>As a beacon for brides-to-be, Salon Chamari offers a harmonious blend of professional care, cutting-edge technology, and a nurturing environment. Our doors open to a world where every client is cherished, every treatment is luxurious, and every visit leaves you feeling like royalty.</p>
                    <p>Embrace the Salon Chamari experience—where exceptional beauty services meet affordability and every moment is a step towards the aisle of radiance.</p>
                </div>
            </div>
            
            <DisplayStudioPackages />
      {/* <video className="background-video" autoPlay loop muted>
                <source src={video} type="video/mp4" />
                {}
                Your browser does not support the video tag.
            </video> */}
        </div>
    );
}

export default StudioHome;
