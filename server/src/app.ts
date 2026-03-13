import express from "express";
import cors from "cors";
import userRouter from "./routes/user-route.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import aiRouter from "./routes/ai-route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_SIDE_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/users", userRouter);
app.use("/ai", aiRouter);

export default app;
