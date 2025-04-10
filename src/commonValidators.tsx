import * as yup from "yup";
import { emailRegex, passwordRegex } from "./validators";
export const emailValidator = yup
  .string()
  .required("Email is required.")
  .matches(emailRegex, "Invalid email format.");

export const passwordValidator = yup
  .string()
  .required("Password is required.")
  .min(8, "Password must be at least 8 characters long.")
  .matches(passwordRegex, "Use at least 1 letter, 1 number & 1 symbol.");
