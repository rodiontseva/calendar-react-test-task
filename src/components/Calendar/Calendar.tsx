import React, { useState, useCallback } from "react";
import { EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEventContext } from "../../context/EventContext";
import EventPopup from "./EventPopup";
import { addDays } from "@fullcalendar/core/internal";

const Calendar = () => {
  const { events, updateEvent, removeEvent, addEvent } = useEventContext();
  const [dialogOpen, setPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState<"create" | "edit">("create");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleDateClick = useCallback((arg: any) => {
    setSelectedEvent({ start: arg.dateStr, end: arg.dateStr }); // Prefill with clicked date
    setPopupMode("create");
    setPopupOpen(true);
  }, []);

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr,
      color: clickInfo.event.backgroundColor,
      notes: clickInfo.event.extendedProps.notes,
    });
    setPopupMode("edit");
    setPopupOpen(true);
  };

  const handleClose = () => {
    setPopupOpen(false);
    setSelectedEvent(null);
  };

  const handleSave = (eventData: any) => {
    if (popupMode === "edit") {
      updateEvent(eventData); // Update event in context
    } else {
      addEvent({ ...eventData, notes: eventData.notes || "" }); // Add notes if provided
    }
    handleClose();
  };

  const handleDelete = () => {
    if (selectedEvent?.id) {
      removeEvent(selectedEvent.id); // Delete event in context
    }
    handleClose();
  };

  const calendarEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    color: event.color,
    notes: event.notes,
  }));

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
        eventClick={handleEventClick}
      />
      <EventPopup
        open={dialogOpen}
        onClose={handleClose}
        onSave={handleSave}
        onDelete={handleDelete}
        initialData={selectedEvent}
        mode={popupMode}
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
