import { FC, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Modal,
  Input,
  Select,
  Button,
  DatePicker,
  DatePickerProps,
} from "antd";
import { StorageService } from "../../contexts/storage.context";
import { priorities } from "../../utils/priorities";
import { ITodo } from "../../interfaces/todo.interface";
import { Epriority } from "../../interfaces/priority.enum";

interface TodoFormProps {
  visible: boolean;
  onClose: () => void;
  groups: Array<{ id: string; title: string }>;
  editingTodo: ITodo;
}

export const TodoUpdateForm: FC<TodoFormProps> = ({
  visible,
  onClose,
  groups,
  editingTodo,
}) => {
  const { updateTodo } = StorageService();

  const [todoData, setTodoData] = useState<ITodo>({
    id: "",
    todo: "",
    annotation: "",
    isFinished: false,
    priority: Epriority.LOW,
    dateStart: "",
    dateFinished: null,
    related: [],
    createdBy: [],
    createdAt: "",
  });

  const onChange: DatePickerProps["onChange"] = (_date, dateString) => {
    setTodoData((prevData) => ({
      ...prevData,
      dateStart: dateString as string,
    }));
  };

  useEffect(() => {
    setTodoData(editingTodo);
  }, [editingTodo]);

  const handleSave = () => {
    updateTodo(editingTodo.id, todoData);
    onClose();
  };

  return (
    <Modal
      title="Atualize sua tarefa"
      open={visible}
      onCancel={onClose}
      footer={null}
      className="rounded-2xl"
    >
      <div className="space-y-4">
        <Input
          maxLength={140}
          placeholder="Título da tarefa"
          value={todoData?.todo}
          onChange={(e) => setTodoData({ ...todoData, todo: e.target.value })}
          required
        />
        <Input.TextArea
          maxLength={2000}
          placeholder="Descrição detalhada"
          value={todoData?.annotation}
          onChange={(e) =>
            setTodoData({ ...todoData, annotation: e.target.value })
          }
        />
        <div className="flex row items-center justify-between">
          <Select
            placeholder="Prioridade"
            value={todoData?.priority}
            onChange={(value) => setTodoData({ ...todoData, priority: value })}
            options={priorities.map(({ label, value, color }) => ({
              label: (
                <span
                  className={`flex items-center ${color} px-2 py-1 rounded-md h-[30px]`}
                >
                  {label}
                </span>
              ),
              value,
            }))}
            className="w-full h-[50px] mr-4"
          />
          <DatePicker
            placeholder="Data de início"
            className="w-full h-[50px] mr-4"
            format="YYYY-MM-DD"
            onChange={onChange}
            value={todoData?.dateStart ? dayjs(todoData?.dateStart) : null}
          />
          <Select
            placeholder="Grupo relacionado"
            value={todoData?.related}
            onChange={(value) => setTodoData({ ...todoData, related: value })}
            options={groups.map(({ id, title }) => ({
              label: title,
              value: id,
            }))}
            className="w-full h-[50px]"
          />
        </div>
        <Button type="primary" onClick={handleSave} className="w-full">
          Salvar
        </Button>
      </div>
    </Modal>
  );
};
