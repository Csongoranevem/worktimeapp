import { User } from "./user";

export interface WorkTime {
  id: number;
  userId: number;
  user?: User;
  startTime: string;
  endTime?: string;
  duration: number;
}