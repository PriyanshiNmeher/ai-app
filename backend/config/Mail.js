// import nodemailer from "nodemailer"

// const transporter = nodemailer.createTransport({
  //   service: "Gmail",
  //   port: 465,
  //   secure: true, 
//   auth: {
  //     user: process.env.EMAIL,
  //     pass: process.env.EMAIL_PASS,
  //   },
  
  
  // });
  
  // const sendMail = async(to, otp)=>{
    //  await transporter.sendMail({
//         from:`${process.env.EMAIL}`,
//         to,
//         subject: "Reset Your Password",
//         html: `<p> Your OTP for password reset is <b> ${otp}</b>. It expires in 5 minutes. </p>`
//      })
// }

// export default sendMail

// config/Mail.js
import { Resend } from 'resend';
import dotenv from "dotenv"

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (email, otp) => {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: email,
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