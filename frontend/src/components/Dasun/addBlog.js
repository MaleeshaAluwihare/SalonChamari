// AddBlog.js

import React, { useState } from 'react';
import axios from 'axios';

const AddBlog = () => {
  const [blogId, setBlogId] = useState('');
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('blogId', blogId);
    formData.append('topic', topic);
    formData.append('content', content);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:8070/Blogs/add', formData);
      alert('Blog added successfully');
      // Reset form fields
      setBlogId('');
      setTopic('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error adding blog:', error);
      alert('Failed to add blog');
    }
  };

  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Blog ID" value={blogId} onChange={(e) => setBlogId(e.target.value)} />
        <input type="text" placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;
