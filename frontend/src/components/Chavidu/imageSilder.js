import React, { useState } from 'react';
import '../../css/chavidu/salonImageSlider.css'; // Import your CSS file
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

import Image1 from '../../images/chavidu/IMG1.jpg';
import Image2 from '../../images/chavidu/IMG2.jpg';
import Image3 from '../../images/chavidu/IMG3.jpg';
import Image4 from '../../images/chavidu/IMG4.jpg';
import Image5 from '../../images/chavidu/IMG5.JPG';
import Image6 from '../../images/chavidu/IMG6.JPG';
import Image7 from '../../images/chavidu/IMG7.JPG';
import Image8 from '../../images/chavidu/IMG8.jpg';
import Image9 from '../../images/chavidu/IMG9.jpg';
import Image10 from '../../images/chavidu/IMG10.jpg';
import Image11 from '../../images/chavidu/IMG11.jpg';
import Image12 from '../../images/chavidu/IMG12.jpg';
import Image13 from '../../images/chavidu/IMG13.JPG';
import Image14 from '../../images/chavidu/IMG14.JPG';

const images = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
  Image10,
  Image11,
  Image12,
  Image13,
  Image14,
];

const SliderSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="container">
      <ul className="images">
        {images.map((image, index) => (
          <li
            key={index}
            className={index === activeIndex ? 'result active' : 'result'}
            onClick={() => handleImageClick(index)}
          >
            <img src={image} alt={`Image ${index + 1}`} />
          </li>
        ))}
      </ul>
      <Link to="/studio/booking">
  <button className="button-5">Book Now</button>
</Link>


<div className='locationContainer'>
                <div className='mapContainer'>
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
                <div className='detailContainer'>
                    <div className='contactInfo'>
                        <p className='title'><FontAwesomeIcon icon={faLocationDot} className='location-icon'/>LOCATE US</p>
                        <p>
                            Nishan Studio
                            <br/>
                            523/7 DS Senanayake Mawatha
                            <br/>
                            Anuradhapura
                        </p>
                    </div>
                    <div className='contactInfo'>
                        <p className='title'><FontAwesomeIcon icon={faPhone} className='location-icon'/>CONTACT US</p>
                        <p className='phone'>
                            <span>Phone:</span> +94 767455431
                        </p>
                        <p className='email'>
                            <span>E-mail:</span> NishanStudio.com
                        </p>
                    </div>
                </div>
            </div>

    </div>
  );
};

export default SliderSection;
