import { Router } from "express";
import {
  getProjectBySessionId,
  XBLTBrainController,
} from "../controllers/ai-controller.js";
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

aiRouter.get("/project/:sessionId", getProjectBySessionId);

export default aiRouter;
