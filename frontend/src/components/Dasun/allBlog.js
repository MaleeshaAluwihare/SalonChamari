// src/components/ViewBlog.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewBlog = () => {
  const [blogs, setBlogs] = useState([]);

  // Function to fetch blogs from the backend
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:8070/Blogs/display');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  // Fetch blogs when the component mounts
  useEffect(() => {
    fetchBlogs();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <h2>All Blogs</h2>
      <div className="blog-list">
        {blogs.map(blog => (
          <div key={blog.blogId} className="blog-item">
            <h3>{blog.topic}</h3>
            <p>{blog.content}</p>
            {blog.image && (
              <img src={`http://localhost:8070/${blog.image}`} alt={blog.topic} style={{ maxWidth: '100%', height: 'auto' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBlog;
