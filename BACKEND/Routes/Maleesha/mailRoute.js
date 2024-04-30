const express = require('express')
const app = express();
const nodemailer = require("nodemailer");


app.post("/mail", async (req, res) => {
  try {
    const { email, subject, body } = req.body;
    let transporter = nodemailer.createTransport({
      service: "gmail", // mail platform
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL, // my email
        pass: process.env.PASSWORD, // my email app password
      },
    });

    //sendmail
    await transporter.sendMail({
      from: "malshaconline@gmail.com", 
      to: email, // to email
      subject,
      text: "Hello world?",
      html: body,
    });
    res.status(200).json("send mail success");
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
  
});

module.exports = app;