import { MenuItem, SxProps, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type TInputProps = {
    items:string[],
  name: string;
  label?: string;
  type?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  sx?:SxProps,
  placeholder?:string,
  required?:boolean
 
  
};

const PHSelectField = ({
  name,
  label,
  type = 'text',
  size = 'small',
  fullWidth,
  sx,
  required,
  items
}: TInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control} 
      name={name}
      
      render={({ field, fieldState:{error} }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          select
          sx={sx}
          fullWidth={fullWidth}
          placeholder={label}
        required={required}
        error={!!error?.message}
        helperText={error?.message}
        > 
        {items.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default PHSelectField;