import { z } from "zod";

// ZOD validation schema for validating Login form data
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be 8 or more characters long"),
});

// ZOD validation schema for validating Register form data
const registerSchema = z.object({
  fullname: z.string().min(3, {
    message: "First must be at least 3 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be 8 or more characters long"),
});

// ZOD validation schema for validating Forgot Password form data
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

// ZOD validation schema for validating Reset Password form data
const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be 8 or more characters long"),
});

// ZOD validation schema for validating Blog Post form data
const postSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  summary: z.string().min(3, {
    message: "Summary must be at least 10 characters.",
  }),
  image: z.string().optional(),
});

export { loginSchema, registerSchema, postSchema, forgotPasswordSchema, resetPasswordSchema }
