import OTPModel from "../models/otp-model.js";
import UserModel from "../models/user-model.js";
import { Request, Response } from "express";
import { generateOtpService } from "../services/user-service.js";

export const GenerateOTP = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { email }: { email: string } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already Created with this email",
      });
    }

    const otpModel = await OTPModel.findOne({ email });

    if (otpModel) {
      const currentTime = <Date>new Date();
      if (otpModel.expiresAt > currentTime) {
        return res.status(400).json({
          message: "OTP already sent. Please check your email.",
        });
      }
    }

    await generateOtpService(email);

    return res.status(200).json({
      message: "OTP sent successfully",
    });
    
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
