import express from "express";
import * as userSchemas from "../models/User.js";
import { validateBody } from "../decorators/index.js";
import authControler from "../controllers/auth-controler.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";

const authRouter = express.Router();
const userSignupValidate = validateBody(userSchemas.userSignupSchema);
const userSigninValidate = validateBody(userSchemas.userSigninSchema);
const userRefreshValidate = validateBody(userSchemas.userVerifySchema);

authRouter.post("/register", userSignupValidate, authControler.signup);
authRouter.get("/verify/:verificationToken", authControler.verifyEmail);
authRouter.post(
  "/verify",
  isEmptyBody,
  userRefreshValidate,
  authControler.resendVerify
);

export default authRouter;
