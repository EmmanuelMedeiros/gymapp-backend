import { Request } from 'express';
import zod from 'zod';
import { UpdateWeightDTO } from '../dto/updateWeight.dto';
import { WeightInPeriodDTO } from '../dto/weightInPeriod.dto';

class UserExerciseDetailsRequest {
  updateWeight(req: Request): any {
    const updateWeightSchema: zod.ZodType<UpdateWeightDTO> = zod.object({
      userExerciseId: zod.number().min(1, "'0' is an invalid ID"),
      weight: zod.number('Weight must be a number').min(1, 'Weight must be gither than 0'),
    });

    return updateWeightSchema.safeParse(req.body);
  }

  minAndMaxWeightByUser(req: Request): any {
    const minAndMaxWeightByUserChema: zod.ZodType<Omit<WeightInPeriodDTO, 'userId'>> = zod.object({
      exerciseId: zod.number('You must pass a valid exercise ID').min(1, "'0' is an invalid ID"),
      datePeriod: zod.object({
        initial: zod.string().pipe(zod.iso.date({ message: 'Invalid initial date format' })),
        final: zod.string().pipe(zod.iso.date({ message: 'Invalid final date format' })),
      }),
    });

    return minAndMaxWeightByUserChema.safeParse(req.body);
  }
}

export default new UserExerciseDetailsRequest();
