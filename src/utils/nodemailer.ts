import nodemail, { Transporter } from "nodemailer";

const globalForNodeMailer = globalThis as unknown as {
  nodemailer: Transporter;
};

export const nodemailer =
  globalForNodeMailer.nodemailer ||
  nodemail.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

if (process.env.NODE_ENV !== "production")
  globalForNodeMailer.nodemailer = nodemailer;
