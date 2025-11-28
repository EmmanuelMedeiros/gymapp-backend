import { Request } from "express";
import zod from "zod";
import { CreateUserNotificationFrequencyDTO } from "../dto/createUserNotificationFrequency.dto";
import { zodTimeSchema } from "../../../helper/zodTimeSchema";

export function createRequest(req: Request): any {
  const createSchema: zod.ZodType<
    Omit<CreateUserNotificationFrequencyDTO, "userId">
  > = zod.object({
    hour: zodTimeSchema,
    weekDays: zod.string().regex(/^[0-6](,[0-6])*$/, {
      message: "weekDays must contain only digits between 0 and 6",
    }),
  });

  return createSchema.safeParse(req.body);
}
