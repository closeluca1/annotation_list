import { LOCAL_STORAGE_KEY } from "../../constants/localStorageKey";
import { IReminder } from "../../interfaces/reminder.interface";

export const getReminders = (): IReminder[] => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};
