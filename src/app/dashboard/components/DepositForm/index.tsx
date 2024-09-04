import { useEffect, useState } from "react";

import { Button, CircularProgress } from "@mui/material";

import StyledModal from "@/shared/components/Modal";
import InputCustom from "@/shared/components/InputCustom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { depositFinance } from "@/services/financeService";

import HorizontalLinearStepper, {
  handleBack,
  handleNext,
} from "@/shared/components/Stepper";

import { getDepositStepSchema } from "@/validations/finance/depositSchema";

import CurrencyAdornment from "@/shared/components/CurrencyAdornment";

import { maskCurrency } from "@/shared/utils/formatters/currency";

import { ButtonContainer, Form, Title } from "./styles";

const steps = ["Depósito", "Confirmar os Dados", "Enviar"];

interface IDepositForm {
  open: boolean;
  handleClose: () => void;
  fetchData: () => void;
}

const DepositForm: React.FC<IDepositForm> = ({
  open,
  handleClose,
  fetchData,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getDepositStepSchema(activeStep)),
  });

  const amount = watch("amount", "0,00");

  const onAmountChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue("amount", maskCurrency(event.target.value));
  };

  const onSubmit = async (data: any) => {
    if (isLastStep) {
      setIsLoading(true);
      const response = await depositFinance(data);
      setIsLoading(false);

      if (response.success) {
        handleClose();
        fetchData();
      }
    } else {
      handleNext(activeStep, setActiveStep, steps);
    }
  };

  useEffect(() => {
    if (!open) {
      reset();
      setActiveStep(0);
    }
  }, [open, reset]);

  return (
    <StyledModal open={open} onClose={handleClose}>
      <HorizontalLinearStepper steps={steps} activeStep={activeStep}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && (
            <>
              <div>
                <Title>O quanto quer guardar?</Title>
              </div>
              <InputCustom
                name="amount"
                control={control}
                label="Valor*"
                placeholder="0,00"
                errors={errors}
                onChange={onAmountChangeHandler}
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <CurrencyAdornment currency="R$" position="start" />
                    ),
                  },
                }}
              />
            </>
          )}

          {activeStep === 1 && (
            <div>
              <Title>Guardar</Title>
              <p>R$ {amount}</p>
            </div>
          )}

          {activeStep === 2 && (
            <div>
              <Title>Digite sua senha de login</Title>

              <InputCustom
                name="password"
                type="password"
                control={control}
                label="Senha*"
                errors={errors}
                autoComplete="autoComplete"
              />
            </div>
          )}

          <ButtonContainer>
            {activeStep > 0 && (
              <Button
                variant="outlined"
                onClick={() => handleBack(setActiveStep)}
              >
                Anterior
              </Button>
            )}

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              endIcon={
                isLoading && <CircularProgress color="inherit" size={18} />
              }
            >
              {isLastStep ? "Enviar" : "Próximo"}
            </Button>
          </ButtonContainer>
        </Form>
      </HorizontalLinearStepper>
    </StyledModal>
  );
};

export default DepositForm;
