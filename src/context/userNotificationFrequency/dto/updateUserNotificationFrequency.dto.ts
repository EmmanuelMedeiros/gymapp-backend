export type UpdateUserNotificationFrequencyDTO = {
  id: number;
  userId?: number;
  weekDays?: string;
  hour?: string;
}