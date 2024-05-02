// src/components/ViewBlog.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../CSS/Dasun/customerBlog.css';

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
    <div id="blog_page">
      <h2 id="blog_page_heading" >Blog</h2>
      <div className="blog-list" id="blog_page_blogs" >
        {blogs.map(blog => (
          <div key={blog.blogId} id="blog_page_item" >
            <h3 id="blog_page_item_topic" >{blog.topic}</h3>
            <p id="blog_page_item_content" >{blog.content}</p>
            {blog.image && (
              <img src={`http://localhost:8070/${blog.image}`}  style={{ maxWidth: '100%', height: 'auto' }} id="blog_page_item_image" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBlog;
