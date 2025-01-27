import { useEffect, useState } from "react";

import { GlobalService } from "../../shared/contexts/global.context";
import { userData } from "./../../shared/utils/getUserData";
import { GetUserModal } from "./components/getUserName";
import { NavPills } from "../../shared/components/navPills";
import { TodoForm } from "../../shared/components/todoForm";
import { Epriority } from "../../shared/interfaces/priority.enum";
import { Button } from "antd";

export const Home = () => {
  const { setIsModalVisible } = GlobalService();

  useEffect(() => {
    if (!userData) {
      setIsModalVisible(true);
    }
  }, []);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const openForm = () => setIsFormVisible(true);
  const closeForm = () => setIsFormVisible(false);

  return (
    <div className="container">
      {/* <NavPills /> */}
      <main className="min-h-screen mt-72 w-full px-5 md:px-10 flex flex-col items-center md:max-w-[820px] lg:max-w-[1024px] xl:max-w-[1280px]">
        <Button type="primary" onClick={openForm}>
          Adicionar Tarefa
        </Button>
        
        <TodoForm
          closeForm={closeForm}
          initialData={{
            todo: "Comprar mantimentos",
            annotation: "Lembre-se de comprar frutas e leite.",
            priority: Epriority.HIGH,
          }}
        />
      </main>
      <GetUserModal />
    </div>
  );
};
