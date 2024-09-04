import styled from "styled-components";

import Stepper from "@mui/material/Stepper";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StepperCustom = styled(Stepper)`
  gap: 10px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;
