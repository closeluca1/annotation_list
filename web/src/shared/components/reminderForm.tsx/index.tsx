import { useState } from "react";
import { Modal, Input, Button, Select } from "antd";
import { Settings } from "lucide-react";
import { v4 as uuid } from "uuid";
import { StorageService } from "../../contexts/storage.context";

interface ReminderFormProps {
  visible: boolean;
  onClose: () => void;
  groups: Array<{ id: string; title: string }>;
}

export const ReminderForm: React.FC<ReminderFormProps> = ({
  visible,
  onClose,
  groups,
}) => {
  const { addReminder } = StorageService();
  const [annotation, setAnnotation] = useState("");
  const [relatedGroup, setRelatedGroup] = useState<string | null>(null);

  const handleSave = () => {
    const newReminder = {
      id: uuid(),
      todo: null,
      annotation,
      isFinished: false,
      priority: "neutral",
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

    addReminder(newReminder);
    onClose();
  };

  return (
    <Modal
      title="Adicionar Lembrete"
      open={visible}
      onCancel={onClose}
      footer={null}
      className="rounded-2xl"
    >
      <div className="space-y-4">
        <Input.TextArea
          maxLength={2000}
          placeholder="Descrição detalhada (máx 2000 caracteres)"
          value={annotation}
          onChange={(e) => setAnnotation(e.target.value)}
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
