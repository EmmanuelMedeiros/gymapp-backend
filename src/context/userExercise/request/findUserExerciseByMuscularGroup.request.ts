import { Request } from "express";
import zod from "zod";
import { FindUserExerciseByMuscularGroupDTO } from "../dto/findUserExerciseByMuscularGroup.dto";

export function findUserExerciseByMuscularGroup(req: Request): any {
  const findUserExerciseByMuscularGroupSchema: zod.ZodType<FindUserExerciseByMuscularGroupDTO> = 
    zod.object({
      muscularGroupId: zod.coerce.number().min(1, "'0' is an invalid ID"),
    });

  return findUserExerciseByMuscularGroupSchema.safeParse(req.params);
}