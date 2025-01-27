import { Epriority } from "./priority.enum";
import { IGroup } from "./group.interface";
import { IUser } from "./user.interface";

export interface ITodo {
  id: string;
  todo: string;
  annotation: string;
  isFinished: boolean;
  priority: Epriority;
  dateStart?: string;
  dateFinished: string | null;
  related: IGroup[];
  createdBy: IUser[];
  createdAt: string;
}

export type TTodoForm = Omit<ITodo, "id" | "createdAt" | "dateFinished">;
