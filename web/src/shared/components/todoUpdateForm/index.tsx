import { useState } from "react";
import { Modal, Input, Select, Button } from "antd";
import { Settings } from "lucide-react";
import { v4 as uuid } from "uuid";
import { StorageService } from "../../contexts/storage.context";
import { Epriority } from "../../interfaces/priority.enum";
import { useToast } from "../../contexts/toast.context";
import { priorities } from "../../utils/priorities";

interface TodoFormProps {
  visible: boolean;
  onClose: () => void;
  groups: Array<{ id: string; title: string }>;
}

export const TodoUpdateForm: React.FC<TodoFormProps> = ({
  visible,
  onClose,
  groups,
}) => {
  const { addTodo } = StorageService();
  const { toast } = useToast();
  const [todo, setTodo] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [priority, setPriority] = useState<Epriority>(Epriority.LOW);
  const [relatedGroup, setRelatedGroup] = useState<string | null>(null);

  const handleSave = () => {
    if (!priority) {
      toast.warning("Necessário selecionar uma prioridade");
      return;
    }
    const newTodo = {
      id: uuid(),
      todo,
      annotation,
      isFinished: false,
      priority,
      dateStart: new Date().toISOString(),
      dateFinished: null,
      related: relatedGroup
        ? [
            {
              id: relatedGroup,
              title: groups.find((g) => g.id === relatedGroup)?.title || "",
            },
          ]
        : [],
      createdBy: [{ id: "user-1", name: "Usuário Atual" }],
    };

    addTodo(newTodo);
    onClose();
  };

  return (
    <Modal
      title="Adicionar Tarefa"
      open={visible}
      onCancel={onClose}
      footer={null}
      className="rounded-2xl"
    >
      <div className="space-y-4">
        <Input
          maxLength={140}
          placeholder="Título da tarefa"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          required
        />
        <Input.TextArea
          maxLength={2000}
          placeholder="Descrição detalhada"
          value={annotation}
          onChange={(e) => setAnnotation(e.target.value)}
        />
        <Select
          placeholder="Prioridade"
          value={priority}
          onChange={(value) => setPriority(value)}
          options={priorities.map((p) => ({
            label: (
              <span
                className={`flex items-center ${p.color} px-2 py-1 rounded-md`}
              >
                {p.label}
              </span>
            ),
            value: p.value,
          }))}
          className="w-full"
        />
        <div className="flex items-center space-x-2">
          <Settings size={20} className="text-gray-400" />
          <Select
            placeholder="Grupo relacionado"
            value={relatedGroup}
            onChange={(value) => setRelatedGroup(value)}
            options={groups.map((g) => ({ label: g.title, value: g.id }))}
            className="w-full"
          />
        </div>
        <Button type="primary" onClick={handleSave} className="w-full">
          Salvar
        </Button>
      </div>
    </Modal>
  );
};
