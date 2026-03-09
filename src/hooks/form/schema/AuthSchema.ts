import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(8, "Minimum 8 characters")
      .regex(/[0-9]/, "Need at least one digit")
      .regex(/[^a-zA-Z0-9]/, "Need at least one special character (!@#$%...)"),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Minimum 8 characters"),
});

export type SignUpData = z.infer<typeof signUpSchema>;
export type LoginData = z.infer<typeof loginSchema>;
