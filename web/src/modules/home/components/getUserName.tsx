import { Modal, Input, Form, Button } from "antd";
import { User } from "lucide-react";
import { GlobalService } from "../../../shared/contexts/global.context";

export const GetUserModal = () => {
  const { isModalVisible, handleSaveUser } = GlobalService();

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <User size={20} /> Informe seu nome
        </div>
      }
      open={isModalVisible}
      footer={null}
      closable={false}
    >
      <Form name="userForm" layout="vertical" onFinish={handleSaveUser}>
        <Form.Item
          label="Nome"
          name="name"
          rules={[
            { required: true, message: "O nome é obrigatório." },
            {
              min: 3,
              message: "O nome deve ter no mínimo 3 caracteres.",
            },
          ]}
        >
          <Input placeholder="Digite seu nome" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
