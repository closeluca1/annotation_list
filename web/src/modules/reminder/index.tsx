import { useState, useEffect } from "react";
import { IReminder } from "../../shared/interfaces/reminder.interface";
import { getReminders } from "../../shared/utils/getReminders";
import { StorageService } from "../../shared/contexts/storage.context";
import { List, Modal, Button, Checkbox } from "antd";
import { Edit, Trash } from "lucide-react";

export const Reminder = () => {
  const { finishReminder, deleteReminder } = StorageService();
  const [reminders, setReminders] = useState<IReminder[]>([]);
  const [selectedReminder, setSelectedReminder] = useState<IReminder | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setReminders(getReminders());
  }, []);

  const openEditModal = (reminder: IReminder) => {
    setSelectedReminder(reminder);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedReminder(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-[#F4F4F4] min-h-screen">
      <h1 className="text-[#0A0A0A] text-2xl font-bold mb-4">Lembretes</h1>

      <div className="mb-8">
        <h2 className="text-[#282828] text-xl font-semibold mb-4">Lembretes</h2>
        <List
          dataSource={reminders}
          renderItem={(item) => (
            <List.Item className="bg-[#FFF] shadow rounded p-4 mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#0A0A0A] text-lg font-semibold">
                    {item.annotation}
                  </h3>
                  <p className="text-[#919191]">
                    {new Date(item.dateStart).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    icon={<Edit />}
                    onClick={() => openEditModal(item)}
                    className="text-[#48E4A2] border-none"
                  />
                  <Button
                    icon={<Trash />}
                    onClick={() => deleteReminder(item.id)}
                    className="text-[#FF5A5A] border-none"
                  />
                  <Checkbox
                    checked={!!item.dateFinished}
                    onChange={() => finishReminder(item.id)}
                  >
                    Done
                  </Checkbox>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>

      <Modal
        title="Edit Reminder"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <div>
          <p className="text-[#282828] text-base font-medium mb-2">
            Annotation: {selectedReminder?.annotation}
          </p>
          <p className="text-[#919191]">
            Related: {selectedReminder?.related.map((r) => r.title).join(", ")}
          </p>
        </div>
      </Modal>
    </div>
  );
};
