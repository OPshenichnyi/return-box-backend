import express from "express";
import * as userSchemas from "../models/User.js";
import { validateBody } from "../decorators/index.js";
import authControler from "../controllers/auth-controler.js";

const authRouter = express.Router();
const userSignupValidate = validateBody(userSchemas.userSignupSchema);
const userSigninValidate = validateBody(userSchemas.userSigninSchema);
const userRefreshValidate = validateBody(userSchemas.userVerifySchema);

authRouter.post("/register", userSignupValidate, authControler.signup);
export default authRouter;
