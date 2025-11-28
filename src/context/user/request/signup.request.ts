import zod from "zod";
import { Request } from "express";
import { SignupDTO } from "../dto/signup.dto";

export function signupRequest(req: Request): any {
  const signupSchema: zod.ZodType<Omit<SignupDTO, 'name'>> = zod.object({
    email: zod.email("Provide a valid email address"),
    password: zod
      .string("Password must be a string")
      .min(5, "Min length of 5 characters"),
    name: zod
      .string("Name parameter must be passed")
      .min(2, "Min length of 2 characters")
      .optional()
  });

  return signupSchema.safeDecode(req.body);
}
