// src/components/ViewBlog.js
import Styles from '../../css/Dasun/blogs.module.css'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerBlog = () => {
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
    <div className={Styles.blog_page}>
      <h2 className={Styles.blog_page_heading} >All Blogs</h2>
      <div className={Styles.blog_list}>
        {blogs.map(blog => (
          <div key={blog.blogId} className="Styles.blog-item">
            <h3 className={Styles.blog_page_item_topic} >{blog.topic}</h3>
            <p className={Styles.blog_page_item_content} >{blog.content}</p>
            {blog.image && (
              <img src={`http://localhost:8070/${blog.image}`} alt={blog.topic} style={{ maxWidth: '100%', height: 'auto' }} className={Styles.blog_page_item_image} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerBlog;