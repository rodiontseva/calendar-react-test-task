import React, { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import eventSchema from "../../validation/eventSchema";
// import { useEventStore } from "../../utils/useEventStore";
import { useEventContext } from "../../context/EventContext";

//interface for the EventPopup component
interface EventPopupProps {
  open: boolean;
  onClose: () => void;
  initialDate: string | null;
}

const EventPopup: FC<EventPopupProps> = (props) => {
  const { open, onClose, initialDate } = props;

  // const { addEvent } = useEventStore();
  const { addEvent } = useEventContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    id: string;
    title: string;
    start: string;
    startTime: string;
    endTime: string;
    notes: string;
    color: string;
  }>({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      id: Date.now().toString(),
      title: "",
      start: initialDate || new Date().toISOString().split("T")[0],
      startTime: "",
      endTime: "",
      notes: "",
      color: "#000000",
    },
  });

  const onSubmit = (data: any) => {
    const event = {
      ...data,
      start: `${data.start}T${data.startTime}`, // Combine date and start time
      end: `${data.start}T${data.endTime}`, // Combine date and end time
    };
    //if allDay is true, set start and end to the same date without time
    if (data.allDay) {
      event.start = data.start;
      event.end = data.start;
    }
    console.log("Form data:", event);

    addEvent(event);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Event</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                error={!!errors.title}
                helperText={errors.title?.message}
                fullWidth
                margin="dense"
              />
            )}
          />
          <Controller
            name="start"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Start Date"
                type="date"
                error={!!errors.start}
                helperText={errors.start?.message}
                fullWidth
                margin="dense"
              />
            )}
          />
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Start Time"
                type="time"
                error={!!errors.startTime}
                helperText={errors.startTime?.message}
                fullWidth
                margin="dense"
              />
            )}
          />
          <Controller
            name="endTime"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="End Time"
                type="time"
                error={!!errors.endTime}
                helperText={errors.endTime?.message}
                fullWidth
                margin="dense"
              />
            )}
          />

          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Notes"
                multiline
                rows={3}
                error={!!errors.notes}
                helperText={errors.notes?.message}
                fullWidth
                margin="dense"
              />
            )}
          />
          <Controller
            name="color"
            control={control}
            render={({ field }) => <input {...field} type="color" />}
          />
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventPopup;
