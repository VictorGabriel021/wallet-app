import React, { ChangeEvent } from "react";

import { FormControl, TextField, TextFieldProps } from "@mui/material";

import { Control, Controller, FieldErrors } from "react-hook-form";

interface IInputCustomProps {
  label: string;
  name: string;
  defaultValue?: string | number;
  control: Control<any>;
  errors: FieldErrors<any>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCustom = ({
  name,
  label,
  defaultValue,
  control,
  errors,
  onChange,
  ...rest
}: IInputCustomProps & TextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ""}
      render={({ field }) => (
        <FormControl variant="outlined" fullWidth>
          <TextField
            {...field}
            placeholder={label}
            label={label}
            error={!!errors[name]}
            helperText={errors[name]?.message as string}
            onChange={(event) => {
              field.onChange(event);
              if (onChange) onChange(event as ChangeEvent<HTMLInputElement>);
            }}
            {...rest}
          />
        </FormControl>
      )}
    />
  );
};

export default InputCustom;
