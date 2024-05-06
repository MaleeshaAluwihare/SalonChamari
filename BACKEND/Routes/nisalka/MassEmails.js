const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { User } = require('../../Models/nisalka/user'); // Import the User model

// Route to send mass emails
router.post('/send-mass-email', async (req, res) => {
    try {
      const { subject, text } = req.body; // Get the email subject and text from the request body
  
      // Create a nodemailer transporter
      const transporter = nodemailer.createTransport({
        // Configure your email service provider (e.g., Gmail, SendGrid, etc.)
        // You'll need to provide the appropriate configuration details
        service: 'gmail',
        auth: {
          user: 'sliititpt105@gmail.com',
          pass: 'qzfn juro ifbt ncgf'
        }
      });
  
      // Fetch all user emails from the database
      const users = await User.find({}, { email: 1 }); // Fetch only the email field
  
      // Prepare the email options
      const mailOptions = {
        from: 'sliititpt105@gmail.com', // Sender's email address
        subject: subject, // Email subject (from the request body)
        text: text // Email text (from the request body)
      };
  
      // Loop through each user and send the email
      for (const user of users) {
        mailOptions.to = user.email; // Set the recipient's email address
        await transporter.sendMail(mailOptions); // Send the email
      }
  
      res.status(200).json({ message: 'Mass email sent successfully' });
    } catch (error) {
      console.error('Error sending mass email:', error);
      res.status(500).json({ error: 'An error occurred while sending mass email' });
    }
  });

  module.exports = router;