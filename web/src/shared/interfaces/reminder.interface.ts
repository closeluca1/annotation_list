export interface IReminder {
  id: string;
  annotation: string;
  dateStart: string;
  dateFinished: string | null;
  related: { id: string; title: string }[];
  createdBy: { id: string; name: string }[];
}

export type TReminderForm = Omit<IReminder, "id" | "dateStart" | "dateFinished">;