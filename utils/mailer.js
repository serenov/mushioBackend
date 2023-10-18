const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE, 
  auth: {
    user: process.env.MAIL_ID,
    type: 'OAuth2',
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.MAIL_OAUTH_CLIENT_ID,
    clientSecret: process.env.MAIL_OAUTH_CLIENT_SECRET,
    refreshToken: process.env.MAIL_OAUTH_REFRESH_TOKEN,
  },
});


const sendVerificationEmail =  (email, OTP) => {
  

  const mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: 'Email Verification',
    text: `OTP for verifying your account: ${OTP}`,
  };
  
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  })
};

module.exports = sendVerificationEmail;
