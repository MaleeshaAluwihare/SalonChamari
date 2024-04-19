const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Blogs = require("../../Models/Dasun/BlogModel");



// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage });

// CRUD operations

// Create a new blog
router.post('/add', upload.single('image'), async (req, res) => {
  const { blogId, topic, content } = req.body;
  const imagePath = req.file ? req.file.path : '';

  try {
    const newBlog = new Blogs({ blogId, topic, content, image: imagePath });
    await newBlog.save();
    res.json(newBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Read all blogs
router.get('/display', async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get('/get/:blogId', async (req, res) => {
  const { blogId } = req.params;

  try {
      // Find the blog in the database by its blogId
      const blog = await Blogs.findOne({ blogId });

      if (!blog) {
          return res.status(404).json({ message: 'Blog not found' });
      }

      res.status(200).json(blog);
  } catch (error) {
      console.error('Error fetching blog:', error);
      res.status(500).json({ message: 'Server error' });
  }
});




// Update a blog by blogId
router.put('/update/:blogId', upload.single('image'), async (req, res) => {
  const { topic, content } = req.body;
  const { blogId } = req.params;
  const imagePath = req.file ? req.file.path : '';

  try {
    const updatedBlog = await Blogs.findOneAndUpdate(
      { blogId },
      { topic, content, image: imagePath },
      { new: true }
    );
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Delete a blog by blogId
router.delete('/delete/:blogId', async (req, res) => {
  const { blogId } = req.params;

  try {
    await Blogs.findOneAndDelete({ blogId });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
