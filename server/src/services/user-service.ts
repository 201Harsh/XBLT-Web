import OTPModel from "../models/otp-model.js";

export const generateOtpService = async (email: string): Promise<void> => {
  if (!email) {
    throw new Error("Email is required");
  }

  try {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpModel = OTPModel.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    if (!otpModel) {
      throw new Error("Failed to create OTP");
    }

    return;

  } catch (error) {
    throw new Error("Something went wrong! Please try again.");
  }
};
