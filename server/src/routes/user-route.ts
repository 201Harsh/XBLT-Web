import { Router } from "express";
import ValidateData from "../middlewares/validate-date.js";
import { body } from "express-validator";
import { GenerateOTP } from "../controllers/user-controller.js";

const userRouter = <Router>Router();

userRouter.post(
  "/otp-generate",
  [body("email").isEmail().withMessage("Invalid Email")],
  ValidateData,
  GenerateOTP,
);

export default userRouter;
