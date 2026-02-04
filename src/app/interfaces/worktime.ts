import { User } from "./user";

export interface Worktime {
  id?: string;
  userId: string;
  user?: User | null;
  date: string | Date;
  start: string;
  end: string;
}
