import { SxProps, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

type TDatePicker = {
    name: string;
    label?: string;
    size?: 'small' | 'medium';
    fullWidth?: boolean;
    sx?: SxProps,
    required?: boolean;

};





const PHDatePicker = ({ name, required, size, fullWidth, sx,label }: TDatePicker) => {
    const { control, formState } = useFormContext();
    

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={dayjs(new Date().toDateString())}
            render={({field:{value, onChange, ...field}}) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                    label={label}
                    timezone='system'
                    disablePast
                     {...field} 
                     value={value || Date.now()}
                     onChange={(date)=>onChange(date)}
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
            )}
        />
    );
}

export default PHDatePicker
