import { SxProps, TextField } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

type TTimePicker = {
    name: string;
    label?: string;
    size?: 'small' | 'medium';
    fullWidth?: boolean;
    sx?: SxProps,
    required?: boolean;

};





const PHTimePicker = ({ name, required, size, fullWidth, sx, label }: TTimePicker) => {
    const { control, formState } = useFormContext();
    const isError = formState.errors[name] !== undefined;

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={dayjs(new Date().toDateString())}
            render={({ field: { value, onChange, ...field } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        label={label}
                        timezone='system'
                        disablePast
                        {...field}

                        value={value || Date.now()}
                        onChange={(time) => onChange(time)}
                        slotProps={{
                            textField: {
                                required: required,
                                size: size,
                                sx: {
                                    ...sx,
                                },
                                variant: "outlined",
                                fullWidth: fullWidth,
                                error: isError,
                                helperText: isError
                                    ? (formState.errors[name]?.message as string)
                                    : "",
                            },

                        }}

                    />
                </LocalizationProvider>
            )}
        />
    );
}

export default PHTimePicker
