import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadComponent = () => {
  const [image, setImage] = useState(null);
  const [packageName, setPackageName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePackageNameChange = (e) => {
    setPackageName(e.target.value);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('packageName', packageName);

      await axios.post('/StudioAdmin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadStatus('Upload successful');
    } catch (error) {
      setUploadStatus('Upload failed');
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <div>
        <label>Package Name:</label>
        <input type="text" value={packageName} onChange={handlePackageNameChange} />
      </div>
      <div>
        <label>Choose Image:</label>
        <input type="file" onChange={handleImageChange} />
      </div>
      <div>
        <button onClick={handleUpload}>Upload</button>
      </div>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default ImageUploadComponent;
