import { Request } from "express";
import zod from "zod";

export function findById(req: Request): any {
  const findByIdSchema: zod.ZodType<{ id: number }> = 
    zod.object({
      id: zod.coerce.number().min(1, "'0' is an invalid ID")
    });

  return findByIdSchema.safeParse(req.params);
}