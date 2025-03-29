import * as yup from "yup";

const eventSchema = yup.object().shape({
  id: yup
    .string()
    .required("ID is required")
    .default(() => Date.now().toString()), // Use a function to generate the default value dynamically
  title: yup
    .string()
    .max(30, "Title must be at most 30 characters")
    .required("Title is required"),
  start: yup
    .string()
    .required("Start date is required")
    .test("is-future-date", "Start date must be in the future", (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime()) && date > new Date(); // Ensure valid date and future comparison
    }),
  startTime: yup.string().required("Start time is required"),
  endTime: yup
    .string()
    .required("End time is required")
    .test(
      "is-after-start",
      "End time must be after start time",
      function (value) {
        const { startTime, allDay } = this.parent;
        if (allDay) return true; // Skip validation if allDay is true
        if (!startTime || !value) return true; // Skip if either value is missing
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${value}:00`);
        return end > start; // Ensure end time is after start time
      }
    ),
  notes: yup
    .string()
    .max(300, "Notes must be at most 300 characters")
    .required("Notes are required"),
  color: yup.string().required("Color selection is required"),
});

export default eventSchema;
