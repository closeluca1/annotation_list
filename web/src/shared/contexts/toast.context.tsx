import React, { createContext, useContext, ReactNode } from "react";
import { MessageInstance } from "antd/es/message/interface";
import { message } from "antd";

type ToastContextType = {
  toast: MessageInstance;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastServices: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toast, contextHolder] = message.useMessage();

  return (
    <ToastContext.Provider value={{ toast }}>
      {contextHolder}
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast deve ser usado com o ToastProvider");
  }

  return context;
};
