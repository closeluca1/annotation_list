import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScrollToTop from "./shared/utils/scrollToTop";

import { CalendarPage } from "./views/public/calendar";
import { ReminderPage } from "./views/public/reminder";
import { TodayPage } from "./views/public/today";

export const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<CalendarPage />} />

        {/* <Route path="/lista-de-tarefas" element={<CalendarPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
