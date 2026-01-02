import { DatePeriod } from "../../../commons/types/datePeriod.type"

export type WeightInPeriodDTO = {
  datePeriod: DatePeriod;
  exerciseId: number;
  userId: number;
}