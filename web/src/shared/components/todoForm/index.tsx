import React, { useState } from "react";
import { Button, Input, Select } from "antd";
import { StorageService } from "../../contexts/storage.context";
import { TTodoForm } from "../../interfaces/todo.interface";
import { Epriority } from "../../interfaces/priority.enum";

type Props = {
  closeForm: () => void;
  initialData?: Partial<TTodoForm>;
};

export const TodoForm: React.FC<Props> = ({ closeForm, initialData }) => {
  const { addTodo } = StorageService();
  const [todo, setTodo] = useState(initialData?.todo || "");
  const [annotation, setAnnotation] = useState(initialData?.annotation || "");
  const [priority, setPriority] = useState<Epriority>(
    initialData?.priority || Epriority.NEUTRAL
  );
  const [related, setRelated] = useState<string[]>([]);

  const handleSave = () => {
    addTodo({
      todo,
      annotation,
      isFinished: false,
      priority,
      related: related.map((id) => ({ id, title: "Group Name" })),
      createdBy: [{ id: "user-1", name: "John Doe" }],
    });
    closeForm();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
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
      <Select
        value={priority}
        onChange={(value) => setPriority(value)}
        className="w-full mb-4"
      >
        <Select.Option value={Epriority.LOW}>Baixo</Select.Option>
        <Select.Option value={Epriority.NEUTRAL}>Mais ou Menos</Select.Option>
        <Select.Option value={Epriority.MEDIUM}>Médio</Select.Option>
        <Select.Option value={Epriority.HIGH}>Importante</Select.Option>
      </Select>
      <Button type="primary" block onClick={handleSave}>
        Salvar
      </Button>
    </div>
  );
};
