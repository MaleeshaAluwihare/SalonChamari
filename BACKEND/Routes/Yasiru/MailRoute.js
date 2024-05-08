const express = require('express')
const app = express();
const nodemailer = require("nodemailer");


app.post("/mail", async (req, res) => {
  try {
    const { email, subject, body } = req.body;
    let transporter = nodemailer.createTransport({
      service: "gmail", // mail platform
      auth: {
        user: 'sliititpt105@gmail.com', // my email
        pass: 'qzfn juro ifbt ncgf', // my email app password
      },
    });

    //sendmail
    await transporter.sendMail({
      from: 'sliititpt105@gmail.com', 
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