import {z} from "zod";

const email = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .email("Enter a valid email address.")
  .max(254, "Email address is too long.")
  .transform((value) => value.toLowerCase());

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required."),
});

export const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters.").max(100, "Full name must be 100 characters or fewer."),
  email,
  password: z.string().min(8, "Password must be at least 8 characters.").max(72, "Password must be 72 characters or fewer.").regex(/[a-z]/, "Password must include a lowercase letter.").regex(/[A-Z]/, "Password must include an uppercase letter.").regex(/[0-9]/, "Password must include a number."),
  role: z.enum(["RENTER", "OWNER"], {
    error: "Choose whether you are a renter or property owner.",
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
