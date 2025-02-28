import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASSWORD, // the app password you generated, paste without spaces
  },
  secure: true,
  port: 465,
});
