import zod from "zod";
import { Request } from "express";
import { IncludeInWeekDTO } from "../dto/includeInWeek.dto";

export function createRequest(req: Request): any {
  const includeInWeekSchema: zod.ZodType<IncludeInWeekDTO> =
    zod.object({
      id: zod.number(),
      weekDays: zod.string().regex(/^[0-6](,[0-6])*$/, {
        message: "weekDays must contain only digits between 0 and 6",
      }),
    });

  return includeInWeekSchema.safeParse(req.body);
}
