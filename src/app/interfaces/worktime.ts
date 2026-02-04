import { User } from "./user";

export interface Worktime {
  id?: string;
  userId: string;
  user?: User | null;
  date: string | Date;
  startTime: string;
  endTime: string;
  status?: 'active' | 'inactive';
}
