require("dotenv").config();
const nodemailer = require("nodemailer");
exports.sendMail = async (options) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transport.sendMail(mailOptions);
};
