import React, { useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEventContext } from "../../context/EventContext";
import EventPopup from "./EventPopup";

const Calendar = () => {
  const { events } = useEventContext();
  const [dialogOpen, setPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateClick = useCallback((arg: any) => {
    setSelectedDate(arg.dateStr);
    setPopupOpen(true);
  }, []);

  const handleClose = () => {
    setPopupOpen(false);
    setSelectedDate(null);
  };

  const calendarEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    color: event.color,
  }));

  console.log("Events from context:", events);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        events={calendarEvents}
        dateClick={handleDateClick}
        editable={true}
        selectable={true}
        eventContent={renderEventContent}
      />
      <EventPopup
        open={dialogOpen}
        onClose={handleClose}
        initialDate={selectedDate}
      />
    </div>
  );
};

export default Calendar;

function renderEventContent(eventContent: any) {
  return (
    <>
      <div>{eventContent.event.title}</div>
    </>
  );
}
