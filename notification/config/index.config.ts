import dotenv from 'dotenv';
import path from 'path';
import nodemailler from 'nodemailer';

dotenv.config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`),
});

export const config = {
  PORT: process.env.PORT || 3002,
  MAIL: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.NODE_ENV === 'development' ? false : true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  },
};

export const transporter = nodemailler.createTransport({
  host: config.MAIL.host,
  port: config.MAIL.port,
  secure: config.MAIL.secure,
  auth: {
    user: config.MAIL.auth.user,
    pass: config.MAIL.auth.pass,
  },
});
