import React from "react";
import { EventProvider } from "../context/EventContext";
import Calendar from "../components/Calendar/Calendar";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

const CalendarPage = () => {
  return (
    <EventProvider>
      <Header />
      <Sidebar />
      <Calendar />
    </EventProvider>
  );
};

export default CalendarPage;
