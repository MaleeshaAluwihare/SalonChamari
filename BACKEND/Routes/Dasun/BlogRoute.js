// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const Blogs = require("../../Models/Dasun/BlogModel");



// // Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../../../frontend/src/uploads'));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   }
// });

// const upload = multer({ storage });



// //Generate BlogId
// async function generateBlogId() {

//   const prefix = 'BL100';

//   try {

//       const BlogCount = await Blogs.countDocuments();

//       const nextBlogNumber = BlogCount + 1;

//       const BlogId = `${prefix}${nextBlogNumber}`;

//       return BlogId;

//   } catch (error) {

//       console.error('Error generating Blog ID', error);

//   }

// }

// // CRUD operations

// // Create a new blog
// router.post('/add', upload.single('image'), async (req, res) => {

//   const {topic, content } = req.body;

//   const blogId = await generateBlogId();

//   const imagePath = req.file ? req.file.path : '';

//   try {
//     const newBlog = new Blogs({ blogId, topic, content, image: imagePath });
//     await newBlog.save();
//     res.json(newBlog);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// // Read all blogs
// router.get('/display', async (req, res) => {
//   try {
//     const blogs = await Blogs.find();
//     res.json(blogs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// router.get('/get/:blogId', async (req, res) => {
//   const { blogId } = req.params;

//   try {
//       // Find the blog in the database by its blogId
//       const blog = await Blogs.findOne({ blogId });

//       if (!blog) {
//           return res.status(404).json({ message: 'Blog not found' });
//       }

//       res.status(200).json(blog);
//   } catch (error) {
//       console.error('Error fetching blog:', error);
//       res.status(500).json({ message: 'Server error' });
//   }
// });




// // Update a blog by blogId
// router.put('/update/:blogId', upload.single('image'), async (req, res) => {
//   const { topic, content } = req.body;
//   const { blogId } = req.params;
//   const imagePath = req.file ? req.file.path : '';

//   try {
//     const updatedBlog = await Blogs.findOneAndUpdate(
//       { blogId },
//       { topic, content, image: imagePath },
//       { new: true }
//     );
//     res.json(updatedBlog);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });




// // Delete a blog by blogId
// router.delete('/delete/:blogId', async (req, res) => {
//   const { blogId } = req.params;

//   try {
//     await Blogs.findOneAndDelete({ blogId });
//     res.json({ message: 'Blog deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Blogs = require('../../Models/Dasun/BlogModel'); // Import the Blog model

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads')); // Set the destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Set the filename for uploaded files
  }
});

const upload = multer({ storage });



//Generate BlogId
async function generateBlogId() {

  const prefix = 'BL100';

  try {

      const BlogCount = await Blogs.countDocuments();

      const nextBlogNumber = BlogCount + 1;

      const BlogId = `${prefix}${nextBlogNumber}`;

      return BlogId;

  } catch (error) {

      console.error('Error generating Blog ID', error);

  }

}



// CRUD operations for Blogs

// Create a new blog with image upload
router.post('/add', upload.single('image'), async (req, res) => {

  const {topic, content } = req.body;

  const blogId = await generateBlogId();

  const imagePath = req.file ? req.file.path : '';

  try {
    const newBlog = new Blogs({ blogId, topic, content, image: imagePath });
    await newBlog.save();
    res.json(newBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all blogs
router.get('/display', async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a single blog by blogId
router.get('/get/:blogId', async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blogs.findOne({ blogId });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a blog by blogId
router.delete('/delete/:blogId', async (req, res) => {
  const { blogId } = req.params;

  try {
    const deletedBlog = await Blogs.findOneAndDelete({ blogId });
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    // Remove the associated image file from the server if exists
    if (deletedBlog.image) {
      fs.unlinkSync(deletedBlog.image); // Delete the image file
    }
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

