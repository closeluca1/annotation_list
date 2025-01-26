import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { userData } from "./shared/utils/getUserData";

import ScrollToTop from "./shared/utils/scrollToTop";

import { Error404 } from "./views/public/error";
import { Home } from "./modules/home";
import { CalendarPage } from "./views/private/calendar";
import { ReminderPage } from "./views/private/reminder";
import { TodayPage } from "./views/private/today";
import { IUser } from "./shared/interfaces/user.interface";

export const App = () => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    if (!userData) {
      return;
    }

    const parsedUserData = JSON.parse(userData);
    const user = {
      id: parsedUserData.id,
      name: parsedUserData.name,
    };

    setUser({ name: user.name, id: user.id });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Home />} />

        {user?.id && user.name && (
          <>
            <Route
              path="/lista-de-tarefas/calendario"
              element={<CalendarPage />}
            />
            <Route
              path="/lista-de-tarefas/lembretes"
              element={<ReminderPage />}
            />
            <Route path="/lista-de-tarefas/hoje" element={<TodayPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
