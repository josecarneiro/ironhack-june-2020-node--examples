const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

const confirmationUrl = 'https://google.com';

transport
  .sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.NODEMAILER_EMAIL,
    subject: 'An email from José',
    // text: 'Hello world'
    html: `
      <html>
        <head>
          <style>
            a {
              background-color: yellow;
            }
          </style>
        </head>
        <body>
          <a href="${confirmationUrl}">Link to confirm email</a>
        </body>
      </html>
    `
  })
  .then(result => {
    console.log('Email was sent.');
    console.log(result);
  })
  .catch(error => {
    console.log('There was an error sending email');
    console.log(error);
  });
