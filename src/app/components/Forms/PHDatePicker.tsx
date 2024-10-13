import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IDatePicker {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  value?: any; // Add value prop
  onChange?: (date: any) => void; // Add onChange prop
}

const PHDatePicker = ({
  name,
  size = "small",
  label,
  required,
  fullWidth = true,
  sx,
  value,
  onChange, // Destructure onChange
}: IDatePicker) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value || dayjs(new Date().toDateString())}
      render={({ field: { onChange: formOnChange, value: formValue, ...field } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={label}
              timezone="system"
              disablePast
              {...field}
              onChange={(date) => {
                onChange?.(date); // Trigger parent onChange if passed
                formOnChange(date); // Trigger react-hook-form's onChange
              }}
              value={formValue || value}
              slotProps={{
                textField: {
                  required: required,
                  size: size,
                  sx: {
                    ...sx,
                  },
                  variant: "outlined",
                  fullWidth: fullWidth,
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default PHDatePicker;


