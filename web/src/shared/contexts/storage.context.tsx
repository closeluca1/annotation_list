import React, { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { LOCAL_STORAGE_KEY } from "../constants/localStorageKey";
import { ITodo, TTodoForm } from "../interfaces/todo.interface";
import { IReminder, TReminderForm } from "../interfaces/reminder.interface";
import { getReminders } from "../utils/getReminders";

interface StorageProvide {
  children: ReactNode;
}

interface StorageProps {
  todos: ITodo[];
  addTodo: (todo: TTodoForm) => void;
  updateTodo: (id: string, updatedFields: Partial<ITodo>) => void;
  removeTodo: (id: string) => void;
  addReminder: (reminder: TReminderForm) => void;
  deleteReminder: (id: string) => void;
  finishReminder: (id: string) => void;
  unfinishReminder: (id: string) => void;
}

export const StorageContext = createContext({} as StorageProps);

export const StorageServices = React.memo(({ children }: StorageProvide) => {
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as ITodo[]) : [];
  });

  const saveToLocalStorage = (items: ITodo[]) => {
    setTodos(items);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  };

  const addTodo = (todo: TTodoForm) => {
    const newTodo = {
      ...todo,
      id: uuidv4(),
      dateStart: new Date().toISOString(),
      dateFinished: null,
    };
    saveToLocalStorage([...todos, newTodo]);
  };

  const updateTodo = (id: string, updatedFields: Partial<ITodo>) => {
    saveToLocalStorage(
      todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedFields } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    saveToLocalStorage(todos.filter((todo) => todo.id !== id));
  };

  const addReminder = (reminder: TReminderForm) => {
    const reminders = getReminders();

    const newReminder: IReminder = {
      id: uuidv4(),
      dateStart: new Date().toISOString(),
      dateFinished: null,
      ...reminder,
    };

    const updatedReminders = [...reminders, newReminder];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedReminders));
  };

  const updateReminder = (id: string, updatedData: Partial<IReminder>) => {
    const reminders = getReminders();
    const updatedReminders = reminders.map((reminder) =>
      reminder.id === id ? { ...reminder, ...updatedData } : reminder
    );

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedReminders));
  };

  const deleteReminder = (id: string) => {
    const reminders = getReminders();
    const filteredReminders = reminders.filter(
      (reminder) => reminder.id !== id
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredReminders));
  };

  const finishReminder = (id: string) => {
    updateReminder(id, { dateFinished: new Date().toISOString() });
  };

  const unfinishReminder = (id: string) => {
    updateReminder(id, { dateFinished: null });
  };

  return (
    <StorageContext.Provider
      value={{
        todos,
        addTodo,
        updateTodo,
        removeTodo,
        addReminder,
        deleteReminder,
        finishReminder,
        unfinishReminder,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
});

export function StorageService() {
  return useContext(StorageContext);
}
