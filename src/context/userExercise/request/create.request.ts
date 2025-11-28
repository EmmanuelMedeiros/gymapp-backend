import zod from "zod";
import { Request } from "express";
import { CreateUserExerciseDTO } from "../dto/createUserExercise.dto";

export function createRequest(req: Request): any {
  const createUserExerciseSchema: zod.ZodType<Omit<CreateUserExerciseDTO, 'userId'>> =
    zod.object({
      muscularGroupId: zod.number(),
      title: zod
        .string("Exercise title must be a string")
        .min(2, "Exercise title must have at least 2 characters"),
      weight: zod.number("Weight must be a number").min(1, "Weight must be gither than 0")
    });

  return createUserExerciseSchema.safeParse(req.body);
}
