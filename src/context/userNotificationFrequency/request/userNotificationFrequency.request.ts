import { Request } from 'express';
import zod from 'zod';
import { CreateUserNotificationFrequencyDTO } from '../dto/createUserNotificationFrequency.dto';
import { zodTimeSchema } from '../../../helper/zodTimeSchema';

class UserNotificationFrequency {
  delete(req: Request): any {
    const deleteSchema: zod.ZodType<{ id: number }> = 
    zod.object({
      id: zod.coerce.number().min(1, "'0' is an invalid ID"),
    });

    return deleteSchema.safeParse(req.params);
  }

  create(req: Request): any {
    const createSchema: zod.ZodType<Omit<CreateUserNotificationFrequencyDTO, 'userId'>> =
      zod.object({
        hour: zodTimeSchema,
        weekDays: zod.string().regex(/^[0-6](,[0-6])*$/, {
          message: 'weekDays must contain only digits between 0 and 6',
        }),
      });

    return createSchema.safeParse(req.body);
  }
}

export default new UserNotificationFrequency();