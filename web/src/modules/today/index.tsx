import { useState, useEffect } from "react";
import { ITodo } from "../../shared/interfaces/todo.interface";
import { Badge, List, Checkbox } from "antd";

import { getTodosForDay } from "../../shared/utils/getTodos";
import { getCurrentDate } from "../../shared/utils/getCurrentDay";
import { Epriority } from "../../shared/interfaces/priority.enum";

export const Today = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const currentDate = getCurrentDate();
    setTodos(getTodosForDay(currentDate));
  }, []);

  return (
    <div className="p-6 bg-[#F4F4F4] min-h-screen">
      <h1 className="text-[#0A0A0A] text-2xl font-bold mb-4">
        Lista de tarefas
      </h1>

      <div>
        <h2 className="text-[#282828] text-xl font-semibold mb-4">
          Today's Todos
        </h2>
        <List
          dataSource={todos}
          renderItem={(item) => (
            <List.Item className="bg-[#FFF] shadow rounded p-4 mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#0A0A0A] text-lg font-semibold">
                    {item.todo}
                  </h3>
                  <Badge
                    color={
                      item.priority === Epriority.LOW
                        ? "#48E4A2"
                        : item.priority === Epriority.MEDIUM
                        ? "#FFB74D"
                        : item.priority === Epriority.NEUTRAL
                        ? "#919191"
                        : "#FF5A5A"
                    }
                    text={item.priority.toUpperCase()}
                  />
                </div>
                <Checkbox
                  checked={item.isFinished}
                  onChange={() => {
                    const updatedTodos = todos.map((todo) =>
                      todo.id === item.id
                        ? {
                            ...todo,
                            isFinished: !todo.isFinished,
                            dateFinished: !todo.isFinished
                              ? new Date().toISOString()
                              : null,
                          }
                        : todo
                    );
                    setTodos(updatedTodos);
                    localStorage.setItem(
                      "annotation_list",
                      JSON.stringify(updatedTodos)
                    );
                  }}
                >
                  Done
                </Checkbox>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
