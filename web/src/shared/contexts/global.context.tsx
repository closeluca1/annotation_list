import React, { createContext, ReactNode, useContext, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { useToast } from "./toast.context";
import { LOCAL_STORAGE_USER_DATA } from "../constants/localStorageKey";
import { IUser } from "../interfaces/user.interface";

interface GlobalProvide {
  children: ReactNode;
}

interface GlobalProps {
  isModalVisible: boolean;
  handleSaveUser: (values: IUser) => void;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext({} as GlobalProps);

export const GlobalServices = React.memo(({ children }: GlobalProvide) => {
  const { toast } = useToast();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSaveUser = (values: IUser) => {
    const newUserData: IUser = {
      id: uuidv4(),
      name: values.name,
    };

    localStorage.setItem(LOCAL_STORAGE_USER_DATA, JSON.stringify(newUserData));
    toast.success("Nome salvo com sucesso");
    setIsModalVisible(false);
  };

  return (
    <GlobalContext.Provider
      value={{ isModalVisible, handleSaveUser, setIsModalVisible }}
    >
      {children}
    </GlobalContext.Provider>
  );
});

export function GlobalService() {
  return useContext(GlobalContext);
}
