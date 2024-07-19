import React, { useState } from 'react';
import styles from '../../css/chavidu/salonImageSlider.module.css'; // Import your CSS file
import { Link } from 'react-router-dom';


import Image1 from '../../images/chavidu/IMG11.jpg';
import Image2 from '../../images/chavidu/IMG2.jpg';
import Image3 from '../../images/chavidu/IMG3.jpg';
import Image4 from '../../images/chavidu/IMG4.jpg';
import Image5 from '../../images/chavidu/IMG5.JPG';
import Image6 from '../../images/chavidu/IMG6.JPG';
import Image7 from '../../images/chavidu/IMG7.JPG';
import Image8 from '../../images/chavidu/IMG8.jpg';
import Image9 from '../../images/chavidu/IMG9.jpg';
import Image10 from '../../images/chavidu/IMG10.jpg';
// import Image11 from '../../images/chavidu/IMG1.jpg';
// import Image12 from '../../images/chavidu/IMG12.jpg';
// import Image13 from '../../images/chavidu/IMG13.JPG';
// import Image14 from '../../images/chavidu/IMG14.JPG';

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
  Image10
  // Image11,
  // Image12,
  // Image13,
  // Image14,
];

const SliderSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.images}>
        {images.map((image, index) => (
          <li
            key={index}
            className={`${styles.result} ${index === activeIndex ? styles.active : ''}`}
            onClick={() => handleImageClick(index)}
          >
            <img src={image} alt={`Image ${index + 1}`} />
          </li>
        ))}
      </ul>
      <Link to="/studio/booking" className={styles.button5}>
        Book Now
      </Link>

      
    </div>
  );
};

export default SliderSection;
