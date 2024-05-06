import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PackageImages = () => {
  const [packageName, setPackageName] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const fetchImages = async (packageName) => {
    try {
      const response = await axios.get(`/StudioAdmin/package/${packageName}/images`);
      setImages(response.data.images);
      setError(null);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Package not found');
      setImages([]);
    }
  };

  const handleChange = (event) => {
    setPackageName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchImages(packageName);
  };

  return (
    <div>
      <h2>Enter Package Name</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={packageName}
          onChange={handleChange}
          placeholder="Enter package name"
          required
        />
        <button type="submit">Show Images</button>
      </form>
      {error && <p>{error}</p>}
      {images.length > 0 && (
        <div>
          <h2>Images for Package: {packageName}</h2>
          <div className="image-container">
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Image ${index}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageImages;
