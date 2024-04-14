import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import ServiceList from "../../components/Maleesha/ServiceList";
import '../../css/Maleesha/CostumePage.css';
import video from '../../video/costumeVideo.mp4';


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
    <div className='main-container'>
      <div className="serviceList-container">
        <ServiceList />
      </div>
      <div className="introduction">
        <div className="scrollable-content">
            <h3>Elegance in Every Thread</h3>
            <p>Step into a world where fairy tales come true, and every bride is the star of her own enchanting story. Our wedding dress collection is a curated symphony of timeless elegance and contemporary charm, designed to make your special day truly unforgettable. With each gown crafted to perfection, we invite you to explore a haven of luxurious lace, delicate details, and silhouettes that dance with grace. Unveil your dream dress with us and let your love story begin in beauty and splendor.</p>
        </div>
        <div className="video-container">
          <video  ref={videoRef} width="100%" autoPlay loop muted>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div>
        <p></p>
      </div>
      <hr class="styled-hr" />
      <div className='products-container'>
        {currentProducts.map(product => (
          <div className='product-card' key={product._id}>
            <img src={require(`../../uploads/${product.image}`)} alt={product.itemName} />
          </div>
        ))}
      </div>
      <div className="button-container">
        {currentPage > 1 && (
            <button onClick={() => paginate(currentPage - 1)} className='pagination-button'>
                <FontAwesomeIcon icon={faLeftLong} className="button-icon" />
            </button>
          )}
          {products.length > productsPerPage && (
            <button onClick={() => paginate(currentPage + 1)} className='pagination-button'>
                <FontAwesomeIcon icon={faRightLong} className="button-icon" />
            </button>
          )}
      </div>
    </div>
  );
}
