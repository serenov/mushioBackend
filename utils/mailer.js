const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE, 
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
});


const sendVerificationEmail = (email, verificationToken) => {
  const mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: 'Email Verification',
    text: `Click the following link to verify your email: ${verificationToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email verification failed:', error);
    } else {
      console.log('Email verification sent:', info.response);
    }
  });
};

module.exports = {
  sendVerificationEmail,
};
