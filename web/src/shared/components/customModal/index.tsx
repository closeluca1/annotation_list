import { FC } from "react";
import { Modal, Button } from "antd";

interface CustomModalProps {
  open: boolean;
  close: () => void;
  content: string;
  onContinue: () => void;
}

export const CustomModal: FC<CustomModalProps> = ({
  open,
  close,
  content,
  onContinue,
}) => {
  return (
    <Modal
      open={open}
      onCancel={close}
      footer={[
        <Button key="close" type="primary" onClick={onContinue}>
          Continuar
        </Button>,
      ]}
    >
      <p>{content}</p>
    </Modal>
  );
};
