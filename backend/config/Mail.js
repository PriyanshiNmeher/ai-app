import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendMail = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS, // APP PASSWORD ONLY
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset OTP</h2>
        <p>Your OTP is <b>${otp}</b></p>
        <p>This OTP will expire in 5 minutes.</p>
      `,
    });

    console.log("✅ MAIL SENT SUCCESSFULLY");
  } catch (error) {
    console.error("MAIL ERROR:", error);
    throw error;
  }
};

export default sendMail;
