const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { User } = require('../../Models/nisalka/user');

// Variable to store the generated OTP
let generatedOTP = '';

// Generate a random 6-digit number
function generateRandomNumber() {
  generatedOTP = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
  return generatedOTP;
}

// Email sending function
function sendEmail(email, randomNum) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sliititpt105@gmail.com', // Your email address
      pass: 'qzfn juro ifbt ncgf', // Your email password
    },
  });

  const mailOptions = {
    from: 'sliititpt105@gmail.com',
    to: email,
    subject: 'Password Reset Verification Code',
    text: `Your verification code is: ${randomNum}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Generate OTP and send it via email
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  console.log("emlISSNNSSSS", email);

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Generate OTP
    const otp = generateRandomNumber();
    console.log(otp);

    // Send OTP via email
    sendEmail(email, otp);

    // Update user's OTP in the database
    user.otp = otp;
    await user.save();

    return res.status(200).json({ message: 'OTP sent successfully', otp });
  } catch (error) {
    console.error('Error generating OTP and sending email:', error);
    return res.status(500).json({ message: 'Error generating OTP and sending email' });
  }
});

// Verify OTP and update password
router.post('/verify-otp', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Verify OTP
    if (otp !== generatedOTP) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

   // Hash the new password using bcrypt
   bcrypt.hash(newPassword, saltRounds, async (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ message: 'Error hashing password' });
    }

    // Update password with the hashed password
    user.password = hashedPassword;
    user.otp = null;

    try {
      await user.save();
      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error saving user:', error);
      return res.status(500).json({ message: 'Error updating password' });
    }
  });
} catch (error) {
  console.error('Error verifying OTP and updating password:', error);
  return res.status(500).json({ message: 'Error verifying OTP and updating password' });
}
});

module.exports = router;
