import { Router } from "express";
import { XBLTBrainController } from "../controllers/ai-controller.js";
import { body } from "express-validator";

const aiRouter = <Router>Router();

aiRouter.post(
  "/brain",
  [
    body("prompt")
      .notEmpty()
      .withMessage("Prompt is required")
      .isString()
      .withMessage("Prompt must be a string"),
  ],
  XBLTBrainController,
);

export default aiRouter;
