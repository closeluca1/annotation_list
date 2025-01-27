import { useEffect } from "react";

import { GlobalService } from "../../shared/contexts/global.context";
import { userData } from "./../../shared/utils/getUserData";
import { GetUserModal } from "./components/getUserName";
import { Button } from "antd";
import { Link } from "react-router-dom";

export const Home = () => {
  const { setIsModalVisible } = GlobalService();

  useEffect(() => {
    if (!userData) {
      setIsModalVisible(true);
    }
  }, []);

  return (
    <div className="container">
      <main className="min-h-screen mt-72 w-full px-5 md:px-10 flex flex-col items-center md:max-w-[820px] lg:max-w-[1024px] xl:max-w-[1280px]">
        <Link to="/lista-de-tarefas/hoje">
          <Button type="primary">Ir para lista de tarefas</Button>
        </Link>
      </main>
      <GetUserModal />
    </div>
  );
};
