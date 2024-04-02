import React, { useState, useEffect } from 'react';
import SaloonImg from '../../images/Maleesha/Saloon.jpg';
import StudioImg from '../../images/Maleesha/Studio.jpg';
import EventImg from '../../images/Maleesha/Event.jpg';
import '../../css/Maleesha/MainPage.css';

function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length); // Cycle through slides
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  const slides = [
    {
      imageSrc: SaloonImg,
      heading: 'Whether your looking to treat your self to a suitable haircut,\ncolour or to pamper your skin & body to a facial or a body scrub,\ngetting ready for a party or it’s your routine grooming \nrequirements, all of your beautifying needs can be taken cared \nby our team of experts.',
      slogan: 'A whole new world, a whole new look'
    },
    {
      imageSrc: StudioImg,
      heading: '',
      slogan: 'Capturing the best moments for you'
    },
    {
      imageSrc: EventImg,
      heading: 'Your Professional Dream Maker',
      slogan: 'Your Professional Dream Maker'
    }, 
  ];

  return (
    <div className="home">
      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`mySlides ${index === currentSlide ? 'active' : ''}`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }} // Slide the container horizontally
          >
            <img src={slide.imageSrc} className="homeimage" alt={slide.text} />
            <div className="text-overlay">
              <h3>{slide.slogan}</h3>
              <h2>{slide.heading}</h2>
              <button className="shopbtn">Visit</button>
            </div>
            <div className="text">{slide.text}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        {slides.map((_, index) => (
          <span key={index} className={`dot ${index === currentSlide ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
