import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Styles from '../../css/Maleesha/CostumePage.module.css';
// import video from '../../video/costumeVideo.mp4';
import Header from './Header';
import Footer from "../../components/Maleesha/Footer";


export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const result = await axios.get("/imageUpload/fetch");
    setProducts(result.data.data);
  };

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    <div className={Styles.maincontainer}>
      <div className={Styles.headercontainer}>
        <Header/>
      </div>
      <div className={Styles.serviceListcontainer}>
        <div className={Styles.ServiceRec}>
                  <h2>OUR SERVICES</h2>
                  <div className={Styles.serviceName}>
                      <h1>Sarees<br/> & Gowns</h1>
                  </div>
                  <div className={Styles.ServiceCircles}>
                      <Link to = '/hair-page' className={Styles.ServicesButton}>HAIR</Link>
                      <Link to = '/skin-page' className={Styles.ServicesButton}>SKIN</Link>
                      <Link to = '/nail-page' className={Styles.ServicesButton}>NAIL</Link>
                      <Link to = '/bridal-page' className={Styles.ServicesButton}>BRIDAL</Link>
                      <Link to = '/costume-page' className={Styles.ServicesButton}>Sarees & Gowns</Link>
                  </div>
            </div>
      </div>
      <div className={Styles.introduction}>
        <div className={Styles.scrollablecontent}>
            <h3>Elegance in Every Thread</h3>
            <p>Step into a world where fairy tales come true, and every bride is the star of her own enchanting story. Our wedding dress collection is a curated symphony of timeless elegance and contemporary charm, designed to make your special day truly unforgettable. With each gown crafted to perfection, we invite you to explore a haven of luxurious lace, delicate details, and silhouettes that dance with grace. Unveil your dream dress with us and let your love story begin in beauty and splendor.</p>
        </div>
        {/* <div className={Styles.videocontainer}>
          <video  ref={videoRef} width="100%" autoPlay loop muted>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
          </video>
        </div> */}
      </div>
      <div>
        <p></p>
      </div>
      <hr class={Styles.styledhr} />
      <div className={Styles.productscontainer}>
        {currentProducts.map(product => (
          <div className={Styles.productcard} key={product._id}>
            <img src={require(`../../uploads/${product.image}`)} alt={product.itemName} />
          </div>
        ))}
      </div>
      <div className={Styles.buttoncontainer}>
        {currentPage > 1 && (
            <button onClick={() => paginate(currentPage - 1)} className={Styles.paginationbutton}>
                <FontAwesomeIcon icon={faLeftLong} className={Styles.buttonicon} />
            </button>
          )}
          {products.length > productsPerPage && (
            <button onClick={() => paginate(currentPage + 1)} className={Styles.paginationbutton}>
                <FontAwesomeIcon icon={faRightLong} className={Styles.buttonicon}/>
            </button>
          )}
      </div>
      <div className={Styles.footercontainer}>
        <Footer/>
      </div>
    </div>
  );
}
