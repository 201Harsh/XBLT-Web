import express from "express";
import userRouter from "./routes/user-route.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/users", userRouter);

export default app;
