// UpdateBlog.js

import React, { useState } from 'react';
import axios from 'axios';

const UpdateBlog = ({ blogId }) => {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('topic', topic);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put(`/api/update/${blogId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Handle success, e.g., show a success message or redirect
    } catch (error) {
      console.error('Error updating blog:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <h2>Update Blog</h2>
      <input
        type="text"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleUpdate}>Update Blog</button>
    </div>
  );
};

export default UpdateBlog;
