import React, { useState, useCallback } from "react";
import { EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEventContext } from "../../context/EventContext";
import EventPopup from "./EventPopup";

const Calendar = () => {
  const { events, updateEvent, removeEvent, addEvent } = useEventContext();
  const [dialogOpen, setPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState<"create" | "edit">("create");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleDateClick = useCallback((arg: any) => {
    setSelectedEvent({ start: arg.dateStr, end: arg.dateStr });
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
      updateEvent(eventData);
    } else {
      addEvent({ ...eventData, notes: eventData.notes || "" });
    }
    handleClose();
  };

  const handleDelete = () => {
    if (selectedEvent?.id) {
      removeEvent(selectedEvent.id);
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

  const handleEventChange = (changeInfo: any) => {
    const updatedEvent = {
      id: changeInfo.event.id,
      title: changeInfo.event.title,
      start: changeInfo.event.startStr,
      end: changeInfo.event.endStr,
      startTime: changeInfo.event.start?.toISOString() || "",
      endTime: changeInfo.event.end?.toISOString() || "",
      color: changeInfo.event.backgroundColor,
      notes: changeInfo.event.extendedProps.notes,
    };

    updateEvent(updatedEvent);
  };

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
        displayEventTime={false}
        eventClick={handleEventClick}
        eventChange={handleEventChange}
        dayMaxEvents={true}
        eventDisplay="block"
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
