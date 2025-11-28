import { Request } from "express";
import zod from "zod";
import { UpdateWeightDTO } from "../dto/updateWeight.dto";

export function updateWeight(req: Request): any {
  const updateWeightSchema: zod.ZodType<UpdateWeightDTO> = 
    zod.object({
      userExerciseId: zod.number().min(1, "'0' is an invalid ID"),
      weight: zod.number("Weight must be a number").min(1, "Weight must be gither than 0")
    });

  return updateWeightSchema.safeParse(req.body);
}