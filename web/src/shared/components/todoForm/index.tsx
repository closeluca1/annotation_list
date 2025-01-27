import React, { useState } from "react";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Input,
  Modal,
  Select,
} from "antd";
import { StorageService } from "../../contexts/storage.context";
import { TTodoForm } from "../../interfaces/todo.interface";
import { Epriority } from "../../interfaces/priority.enum";
import { userData } from "../../utils/getUserData";
import { priorities } from "../../utils/priorities";
import { useToast } from "../../contexts/toast.context";
import { currentDate } from "../../utils/getCurrentDay";

type Props = {
  visible: boolean;
  closeForm: () => void;
  initialData?: Partial<TTodoForm>;
};

export const TodoForm: React.FC<Props> = ({
  visible,
  closeForm,
  initialData,
}) => {
  const { toast } = useToast();
  const { addTodo } = StorageService();
  const [todo, setTodo] = useState(initialData?.todo || "");
  const [annotation, setAnnotation] = useState(initialData?.annotation || "");
  const [priority, setPriority] = useState<Epriority>(
    initialData?.priority || Epriority.NEUTRAL
  );
  const [related, setRelated] = useState<string[]>([]);

  const [dateStart, setDateStart] = useState<string | null>(null);

  const onChange: DatePickerProps["onChange"] = (_date, dateString) => {
    setDateStart(Array.isArray(dateString) ? dateString[0] : dateString);
  };

  const handleSave = () => {
    if (!userData) {
      return;
    }
    const parsedUserData = JSON.parse(userData);

    if (todo.length < 3) {
      toast.error("Necessário adicionar uma tarefa para continuar");
      return;
    }

    addTodo({
      todo,
      annotation,
      isFinished: false,
      priority,
      related: [],
      createdBy: [{ name: parsedUserData.name, id: parsedUserData.id }],
      dateStart: dateStart ? dateStart : currentDate,
    });

    setTodo("");
    setAnnotation("");
    setRelated([]);
    setDateStart(null);
    closeForm();
  };

  return (
    <Modal
      title="Atualize sua tarefa"
      open={visible}
      onCancel={closeForm}
      footer={null}
      className="rounded-2xl"
    >
      <Input
        placeholder="Título"
        value={todo}
        maxLength={140}
        onChange={(e) => setTodo(e.target.value)}
        className="mb-4"
      />
      <Input.TextArea
        placeholder="Anotação"
        value={annotation}
        maxLength={2000}
        onChange={(e) => setAnnotation(e.target.value)}
        rows={5}
        className="mb-4"
      />
      <div className="flex row items-center justify-between ">
        <Select
          value={priority}
          onChange={(value) => setPriority(value)}
          className="w-full h-[50px] mr-4"
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
        />

        <DatePicker
          placeholder="Data de início"
          className="w-full h-[50px] mr-4"
          format="YYYY-MM-DD"
          onChange={onChange}
        />

        <Select
          placeholder="Grupo relacionado"
          value={related}
          onChange={(value) => setRelated(value)}
          options={[]}
          className="w-full h-[50px]"
        />
      </div>
      <Button type="primary" className="mt-5" block onClick={handleSave}>
        Salvar
      </Button>
    </Modal>
  );
};
