import { Resend } from 'resend';
import dotenv from "dotenv"

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (email, otp) => {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: [to],
      subject: 'Password Reset OTP',
      html: `<h1>Your OTP is: ${otp}</h1><p>Valid for 5 minutes</p>`
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};

export default sendMail;
