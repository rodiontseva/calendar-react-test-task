import React, { createContext, useContext, useState, useEffect } from "react";
import { EventData } from "../types/Event";

interface EventContextProps {
  events: EventData[];
  addEvent: (event: EventData) => void;
  removeEvent: (id: string) => void;
  updateEvent: (event: EventData) => void;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (event: EventData) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const removeEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const updateEvent = (updatedEvent: EventData) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  return (
    <EventContext.Provider
      value={{ events, addEvent, removeEvent, updateEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
};
