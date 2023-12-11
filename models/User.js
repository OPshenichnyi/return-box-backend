import { Schema, model } from "mongoose";
import Joi from "joi";

// Have four type users hi have other rules acces:
// provider - owner product,
// customer - sale product owner,
// manager - create orders customer,
// logist - delivery product
const statusUser = ["register", "provider", "customer", "manager", "logist"];

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//+ User schema moongose
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: statusUser,
      default: "register",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    userPhone: {
      type: String,
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

export default User;
//+ END User schema Moongose

//+ User schema Joi

export const userSignupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...statusUser),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().min(6).required(),
});

export const userVerifySchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
  }),
});
