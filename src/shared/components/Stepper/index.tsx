import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { Container, StepperCustom } from "./styles";

interface IHorizontalLinearStepperProps {
  children: React.ReactNode;
  steps: string[];
  activeStep: number;
}

export const handleNext = (
  activeStep: number,
  setActiveStep: React.Dispatch<React.SetStateAction<number>>,
  steps: string[]
) => {
  if (activeStep < steps.length)
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

export const handleBack = (
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
) => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

const HorizontalLinearStepper = ({
  children,
  steps,
  activeStep,
}: IHorizontalLinearStepperProps) => {
  return (
    <Container>
      <StepperCustom activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </StepperCustom>

      {children}
    </Container>
  );
};

export default HorizontalLinearStepper;
