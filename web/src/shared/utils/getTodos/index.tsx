import { LOCAL_STORAGE_KEY } from "../../constants/localStorageKey";
import { ITodo } from "../../interfaces/todo.interface";

export const getTodos = (): ITodo[] => {
  const todos = localStorage.getItem(LOCAL_STORAGE_KEY);
  return todos ? JSON.parse(todos) : [];
};

export const getTodosForDay = (date: string): ITodo[] => {
  const todos = getTodos();
  return todos.filter((todo) => todo.dateStart?.startsWith(date));
};
