import React from "react";

import { InputAdornment, InputAdornmentProps } from "@mui/material";

type CurrencyAdornmentProps = InputAdornmentProps & {
  currency: string;
};

const CurrencyAdornment: React.FC<CurrencyAdornmentProps> = ({
  currency,
  ...InputAdornmentProps
}) => {
  return (
    <InputAdornment {...InputAdornmentProps}>
      <span>{currency}</span>
    </InputAdornment>
  );
};

export default CurrencyAdornment;
