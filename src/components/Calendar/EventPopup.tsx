import React, { FC, useEffect } from "react";
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

interface EventPopupProps {
  open: boolean;
  onClose: () => void;
  onSave: (eventData: any) => void;
  onDelete?: () => void;
  initialData?: any; // Prefilled data for editing
  mode: "create" | "edit"; // Mode to differentiate between creating and editing
}

// Helper function to extract time in "HH:mm" format
const extractTime = (dateTime: string | undefined): string => {
  if (!dateTime) return "";
  const timePart = dateTime.split("T")[1]; // Extract time part
  if (!timePart) return "";
  return timePart.split("+")[0].split("Z")[0].slice(0, 5); // Remove timezone and keep "HH:mm"
};

const EventPopup: FC<EventPopupProps> = (props) => {
  const { open, onClose, onSave, onDelete, initialData, mode } = props;
  console.log(initialData);

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
      id: initialData?.id || Date.now().toString(),
      title: initialData?.title || "",
      start: initialData?.start?.split("T")[0] || "",
      startTime: extractTime(initialData?.start),
      endTime: extractTime(initialData?.end),
      notes: initialData?.notes || "",
      color: initialData?.color || "#000000",
    },
  });

  useEffect(() => {
    reset({
      id: initialData?.id || Date.now().toString(),
      title: initialData?.title || "",
      start: initialData?.start?.split("T")[0] || "",
      startTime: extractTime(initialData?.start),
      endTime: extractTime(initialData?.end),
      notes: initialData?.notes || "", // Ensure notes are reset properly
      color: initialData?.color || "#000000",
    });
  }, [initialData, reset]);

  const onSubmit = (data: any) => {
    const event = {
      ...data,
      start: `${data.start}T${data.startTime}`, // Combine date and start time
      end: `${data.start}T${data.endTime}`, // Combine date and end time
    };
    console.log("Event data:", event);

    onSave(event);
    reset();
    onClose();
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {mode === "edit" ? "Edit Event" : "Create Event"}
      </DialogTitle>
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
            render={({ field }) => (
              <div style={{ marginTop: "1rem" }}>
                <label>Color:</label>
                <input {...field} type="color" />
              </div>
            )}
          />
          <DialogActions>
            {mode === "edit" && onDelete && (
              <Button onClick={onDelete} color="secondary">
                Discard
              </Button>
            )}
            <Button type="submit" color="primary">
              {mode === "edit" ? "Save" : "Create"}
            </Button>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventPopup;
