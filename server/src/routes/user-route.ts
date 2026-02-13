import { Router } from "express";
import { RegisterAndLoginUsingGoogle } from "../controllers/user-controller.js";
import passport from "../lib/passport.js";

const userRouter = <Router>Router();

userRouter.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  }),
);

userRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/signin",
  }),
  RegisterAndLoginUsingGoogle,
);

export default userRouter;
