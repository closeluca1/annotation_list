import { useState, useEffect } from "react";
import { List, Button, DatePicker, DatePickerProps } from "antd";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { LOCAL_STORAGE_KEY } from "../../shared/constants/localStorageKey";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ITodo } from "../../shared/interfaces/todo.interface";
import { getTodosForDay } from "../../shared/utils/getTodos";
import { currentDate } from "../../shared/utils/getCurrentDay";
import { TodoUpdateForm } from "../../shared/components/todoUpdateForm";
import { TodoForm } from "../../shared/components/todoForm";
import { TodoList } from "../../shared/components/TodoList";
import { StorageService } from "../../shared/contexts/storage.context";

export const Today = () => {
  const { todos: allTodos, setTodos: setAllTodos } = StorageService();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState<ITodo | null>(null);
  const [chosedDate, setChosedDate] = useState<string | null>(null);

  useEffect(() => {
    const handleDate = chosedDate ? chosedDate : currentDate;
    setTodos(getTodosForDay(handleDate));
    console.log("ok", currentDate, chosedDate);
  }, [chosedDate, allTodos]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((item) => item.id === active.id);
      const newIndex = todos.findIndex((item) => item.id === over.id);

      const updatedTodos = arrayMove(todos, oldIndex, newIndex);

      const reorderedTodos = updatedTodos.map((todo, index) => ({
        ...todo,
        orderIndex: index,
      }));

      setTodos(reorderedTodos);

      const allUpdatedTodos = allTodos.map(
        (todo) => reorderedTodos.find((t) => t.id === todo.id) || todo
      );

      setAllTodos(allUpdatedTodos);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allUpdatedTodos));
    }
  };

  const toggleTodoStatus = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            isFinished: !todo.isFinished,
            dateFinished: !todo.isFinished ? new Date().toISOString() : null,
          }
        : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
  };

  const handleEditTodo = (todo: ITodo) => {
    setEditingTodo(todo);
    setIsUpdateModalVisible(true);
  };

  const onChange: DatePickerProps["onChange"] = (_date, dateString) => {
    setChosedDate(Array.isArray(dateString) ? dateString[0] : dateString);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-[#0A0A0A] text-2xl font-bold mb-4">
        Lista de Tarefas -
        <DatePicker
          placeholder="Data de início"
          className="w-full h-[50px] mr-4"
          format="YYYY-MM-DD"
          onChange={onChange}
        />
      </h1>
      <div className="mb-8 flex gap-2">
        <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>
          Adicionar nova tarefa
        </Button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={todos.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <List
            dataSource={todos}
            renderItem={(item) => (
              <TodoList
                key={item.id}
                item={item}
                toggleTodoStatus={toggleTodoStatus}
                onEdit={handleEditTodo}
              />
            )}
          />
        </SortableContext>
      </DndContext>

      <TodoForm
        visible={isCreateModalVisible}
        closeForm={() => setIsCreateModalVisible(false)}
      />

      <TodoUpdateForm
        visible={isUpdateModalVisible}
        onClose={() => setIsUpdateModalVisible(false)}
        editingTodo={editingTodo as ITodo}
        groups={[]}
      />
    </div>
  );
};
