import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { HttpError, sendEmail } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import { nanoid } from "nanoid";

const { JWT_SECRET, BASE_URL } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
  });
  const verifyEmail = {
    to: email,
    subject: "Verifycation your email in Aplication RETURN BOX",
    html: `<div><a target ="_blank" Href= "${BASE_URL}/users/verify/${verificationToken}">Verification your Email</a></div>`,
  };
  await sendEmail(verifyEmail);
  res.status(201).json({
    email: newUser.email,
  });
};

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  console.log(verificationToken);
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "null",
  });
  res.json({
    message: "Verification successful",
  });
};

const resendVerify = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Verifycation your email in Aplication RETURN BOX",
    html: `<a target ="_blank" Href= "${BASE_URL}/users/verify/${user.verificationToken}">Verification your Email</a>`,
  };
  await sendEmail(verifyEmail);
  res.json({
    message: "Verification email sent",
  });
};

export default {
  signup: ctrlWrapper(signup),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerify: ctrlWrapper(resendVerify),
};
