import nodemailer from "nodemailer";

export const SendEmail = async (to, subject, text) => {
  try {
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_SMTP_USER, // generated ethereal user
        pass: process.env.MAILTRAP_SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
    from: 'inngest TMS',
    to,
    subject,
    text, // plain‑text body
  });

  console.log("Message sent:", info.messageId);

    // Wrap in an async IIFE so we can use await.
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
