import zod from "zod";
import { Request } from "express";
import { LoginDTO } from "../dto/login.dto";

export function loginRequest(req: Request): any {
  const loginSchema: zod.ZodType<LoginDTO> = zod.object({
    email: zod.email("Provide a valid email address"),
    password: zod
      .string("Password must be a string")
      .min(5, "Min length of 5 characters"),
  });

  return loginSchema.safeParse(req.body);
}
