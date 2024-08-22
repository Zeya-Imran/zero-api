import express from "express";
import { loginUser, createUser } from "./userController.js";
import authentication from "../middlewares/authentication.js";

const userRouter = express.Router();

userRouter.post("/register", createUser);

userRouter.post("/login", authentication, loginUser);

export default userRouter;
