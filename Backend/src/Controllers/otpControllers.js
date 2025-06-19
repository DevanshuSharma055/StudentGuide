import userModel from "../Models/userModel.js";
import { generateOtp, getOTPEmailOptions } from "../Utils/OtpUtils.js";
import { sendError, sendSuccess } from "../Utils/response.js";
import nodemailer from "nodemailer";

const gernateAndSendOtp = async (req, res, next) => {
  // get email
  const { email } = req.body;
  if (!email) {
    return sendError(res, "Plase send Email");
  }
  try {
    // check user

    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return sendError(res, "User not found with this email");
    }
    // 1. create transport
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    try {
      await transport.verify();
    } catch (error) {
      console.error("SMTP verification failed:", error);
      return sendError(res, "Email service configuration error");
    }

    // genate otp
    const otp = generateOtp();
    console.log(otp);
    //send mail
    const sendMail = await transport.sendMail(getOTPEmailOptions(email, otp));
    // save otp to server
    if (sendMail && sendMail.messageId) {
      const now = new Date();

      findUser.verifyOtp = otp;
      findUser.verifyOtpExpireAt = new Date(now.getTime() + 10 * 60000); // 10 minutes from now

      await findUser.save({ validateBeforeSave: false }); // Fix: Await the save operation

      return sendSuccess(res, "OTP sent to your email successfully");
    } else {
      return sendError(res, "Failed to send OTP email");
    }
  } catch (error) {
    if (error.code === "EAUTH") {
      return sendError(res, "Email authentication failed");
    } else if (error.code === "ECONNECTION") {
      return sendError(res, "Email service connection failed");
    }
    return sendError(res);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { otp, email } = req.body;

    if (!otp || !email) {
      return sendError(res, "OTP and email are required", 400);
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return sendError(res, "User not found", 404);
    }

    if (user.verifyOtp !== String(otp)) {
      return sendError(res, "Invalid OTP", 401);
    }

    user.isVerified = true;
    user.verifyOtp = null;
    await user.save();

    return sendSuccess(res, "OTP verified successfully");
  } catch (error) {
    console.error("OTP verification error:", error);
    return sendError(res, "Internal Server Error", 500);
  }
};

export { gernateAndSendOtp, verifyOtp};
