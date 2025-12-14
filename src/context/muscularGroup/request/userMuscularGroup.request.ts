import { Request } from 'express';
import zod from 'zod';
import { CreateUserMuscularGroupDTO } from '../dto/createUserMuscularGroup.dto';

class UserMuscularGroupRequest {
  createRequest(req: Request): any {
    const createSchema: zod.ZodType<Omit<CreateUserMuscularGroupDTO, 'userId'>> = zod.object({
      muscularGroupId: zod.number('select muscular group is mandatory to perform this action'),
      weekDays: zod.string().regex(/^[0-6](,[0-6])*$/, {
        message: 'weekDays must contain only digits between 0 and 6',
      }),
    });

    return createSchema.safeParse(req.body);
  }
}

export default new UserMuscularGroupRequest();
