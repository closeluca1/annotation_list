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
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
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
  const loadFromLocalStorage = (): ITodo[] => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      console.error("Erro ao carregar tarefas");
      return [];
    }
  };

  const [todos, setTodos] = useState<ITodo[]>(loadFromLocalStorage);

  const saveToLocalStorage = (items: ITodo[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
      setTodos(items);
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const getAtualStorageData = (() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const existingTodos = stored ? (JSON.parse(stored) as ITodo[]) : [];

    return existingTodos;
  })();

  const addTodo = (todo: TTodoForm) => {
    let newId = uuidv4();
    while (
      getAtualStorageData.some((existingTodo) => existingTodo.id === newId)
    ) {
      newId = uuidv4();
    }

    const newTodo = {
      ...todo,
      id: newId,
      createdAt: new Date().toISOString(),
      dateFinished: null,
    };

    const updatedTodos = [...getAtualStorageData, newTodo];
    saveToLocalStorage(updatedTodos);
  };

  const updateTodo = (id: string, updatedFields: Partial<ITodo>) => {
    const updatedTodos = getAtualStorageData.map((todo: ITodo) =>
      todo.id === id ? { ...todo, ...updatedFields } : todo
    );

    saveToLocalStorage(updatedTodos);
    setTodos(updatedTodos);
  };

  const removeTodo = (id: string) => {
    const updatedTodos = getAtualStorageData.filter(
      (todo: ITodo) => todo.id !== id
    );

    saveToLocalStorage(updatedTodos);
    setTodos(updatedTodos);
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
        setTodos,
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
