import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "At least one lowercase letter is required")
      .regex(/[A-Z]/, "At least one uppercase letter is required")
      .regex(/[0-9]/, "At least one digit is required")
      .regex(
        /[@$!%*?&]/,
        "At least one special character is required (@$!%*?&)",
      ),
    repeatPassword: z.string(),
    termsAndPolicyChecked: z.boolean().refine((val) => val === true, {
      message:
        "Please accept the terms and conditions and privacy policy to continue",
    }),
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
