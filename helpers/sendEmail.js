const nodemailer = require("nodemailer");

const MAILTRAP_USER = process.env.MAILTRAP_USER;
const MAILTRAP_PASS = process.env.MAILTRAP_PASS;

const sendEmail = (message) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  });

  message["from"] = "nastya_berest@kr.net";

  return transport.sendMail(message);
};

module.exports = sendEmail;
