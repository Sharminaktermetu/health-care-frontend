import { SxProps, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: 'small' | 'medium';
  fullWidth: boolean;
  sx?:SxProps,
  placeholder?:string,
  required?:boolean
 
  
};

const PHInputs = ({
  name,
  label,
  type = 'text',
  size = 'small',
  fullWidth,
  sx,
  required
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
          sx={sx}
          fullWidth={fullWidth}
          placeholder={label}
        required={required}
        error={!!error?.message}
        helperText={error?.message}
        />
      )}
    />
  );
};

export default PHInputs;