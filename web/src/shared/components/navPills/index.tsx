import { useState } from "react";
import { CalendarPage } from "../../../views/private/calendar";
import { ReminderPage } from "../../../views/private/reminder";
import { TodayPage } from "../../../views/private/today";

export const NavPills = () => {
  const [activeTab, setActiveTab] = useState<
    "calendar" | "reminders" | "today"
  >("today");

  const renderTab = () => {
    switch (activeTab) {
      case "calendar":
        return <CalendarPage />;
      case "reminders":
        return <ReminderPage />;
      case "today":
        return <TodayPage />;
    }
  };

  return (
    <div className="h-screen bg-[#F4F4F4]">
      <nav className="flex justify-around p-4 bg-[#282828] text-white">
        <button onClick={() => setActiveTab("calendar")}>Calendário</button>
        <button onClick={() => setActiveTab("reminders")}>Lembretes</button>
        <button onClick={() => setActiveTab("today")}>Hoje</button>
      </nav>
      <div className="p-4">{renderTab()}</div>
    </div>
  );
};
