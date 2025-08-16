import { TextField, FormHelperText, FormControl } from "@mui/material";
import { useState, useEffect } from "react";

//THIS COMPONENT OUTPUT UTC TIME AND INPUT LOCAL TIME

//UTILS
import { cn } from "@/shared/utils/cn";

interface TimeHourInputProps {
  value: string; // Expected format: "YYYY-MM-DDTHH:mm"
  onChange: (newValue: string) => void;
  error?: string; // Single validation error message
  classNames?: string;
  minDate?: string; // New prop for minimum selectable date (YYYY-MM-DD)
}

const LOCALE = "en-US";

const dateToIsoString = (date: string): string => {
  // ISO LOCAL DATE to ISO UTC
  if (!date) return "";
  const dateObj = new Date(date);

  return dateObj.toISOString();
};

const isoStringToDateWithTime = (
  isoDate: string,
): { date: string; time: string } => {
  const date = new Date(isoDate);

  // Extract the date in yyyy-MM-dd format this is en-CA LOCALE
  const formattedDate = date
    .toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-"); // Replace "/" with "-"

  // Extract the time in HH:MM format (24-hour)
  const formattedTime = date.toLocaleTimeString(LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Ensures 24-hour format
  });

  return { date: formattedDate, time: formattedTime };
};

export default function TimeHourInput({
  value,
  onChange,
  error,
  classNames,
  minDate,
}: TimeHourInputProps) {
  const { date: dateRes, time: timeRes } = isoStringToDateWithTime(value);
  // Extract date and time from the value string
  const [date, setDate] = useState(dateRes || "");
  const [time, setTime] = useState(timeRes || "");

  // Handle date change
  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    if (newDate === "") return onChange(""); // Clear the value if date is empty
    onChange(dateToIsoString(`${newDate}T${time || "00:00"}`)); // Ensure time is always set
  };

  // Handle time change
  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    onChange(
      dateToIsoString(
        `${date || new Date().toISOString().split("T")[0]}T${newTime}`
      )
    ); // Ensure date is always set
  };

  useEffect(() => {
    if (!value) {
      setDate("");
      setTime("");
    }
  }, [value]);

  return (
    <FormControl className={cn("flex flex-col", classNames)} error={!!error}>
      <div className="flex items-center">
        {/* Date Input */}
        <TextField
          variant="filled"
          label="Date"
          type="date"
          value={date}
          onChange={(e) => handleDateChange(e.target.value)}
          error={!!error}
          InputLabelProps={{ shrink: true }}
          InputProps={{ className: "rounded-r-none! border-r-0! pt-3!" }}
          inputProps={minDate ? { min: minDate } : {}}
        />

        {/* Time Input */}
        <TextField
          variant="filled"
          label="Time"
          type="time"
          value={time}
          onChange={(e) => handleTimeChange(e.target.value)}
          error={!!error}
          InputLabelProps={{ shrink: true }}
          InputProps={{ className: "rounded-l-none! border-l-0! pt-3!" }}
        />
      </div>

      {/* Single Error Message using MUI Typography */}
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
