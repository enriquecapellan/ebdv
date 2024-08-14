import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import { UseFormReturn } from "react-hook-form";

type InputProps = TextFieldProps & {
  required?: boolean;
  label: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, any>;
};

type DropdownInputProps = InputProps & {
  options: (string | { [key: string]: unknown; label: string })[];
};

export const Input = ({
  required = true,
  label,
  id,
  form,
  ...rest
}: InputProps) => {
  return (
    <TextField
      fullWidth
      label={label}
      required={required}
      variant="standard"
      {...form.register(id)}
      {...rest}
    />
  );
};

export const DropdownInput = ({
  options,
  form,
  id,
  label,
  required = true,
}: DropdownInputProps) => {
  return (
    <Autocomplete
      disablePortal
      id={id}
      options={options}
      sx={{ width: 300 }}
      value={form.getValues(id)}
      renderInput={(params) => (
        <TextField
          required={required}
          variant="standard"
          label={label}
          {...params}
          {...form.register(id)}
        />
      )}
    />
  );
};
