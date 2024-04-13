import React, { useState } from 'react';
import axios from 'axios';
import '../../css/Maleesha/ImageUploadForm.css';

export default function ImageUploadForm (){

  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {

    event.preventDefault();

    const formData = new FormData();
    formData.append('category', category);
    formData.append('itemName', itemName);
    formData.append('itemPrice', itemPrice);
    formData.append('image', image);

    try {
      const response = await axios.post('/imageUpload/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setMessage('Image uploaded successfully!');
        setCategory('');
        setItemName('');
        setItemPrice('');
        setImage('');
        
      } else {
        setMessage('Error: ' + response.data.status);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred, please try again.');
    }
  };

  return (
    <div className="image-container">
      <h2>Image Upload</h2>
      <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                  <option value="">Select a category</option>
                  <option value="Wedding Dress">Wedding Dress</option>
                  <option value="Bridal jewelry">Bridal Jewelry</option>
                  <option value="Other Items">Other Items</option>
                </select>
          </div>

        <div className="form-group">
          <label htmlFor="itemName">Item Name:</label>
          <input type="text" id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="itemPrice">Item Price:</label>
          <input type="number" id="itemPrice" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="image">Choose Image:</label>
          <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} required accept="image/*" />
        </div>

        <button type="submit" className='submitBtn'>Upload Image</button>
      </form>
      {message && <div id="message" style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</div>}
    </div>
  );
};


