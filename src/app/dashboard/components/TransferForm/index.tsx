import { useEffect, useState } from "react";

import { Button, CircularProgress } from "@mui/material";

import StyledModal from "@/shared/components/Modal";
import InputCustom from "@/shared/components/InputCustom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { transferFinance } from "@/services/financeService";

import HorizontalLinearStepper, {
  handleBack,
  handleNext,
} from "@/shared/components/Stepper";

import { getTransferStepSchema } from "@/validations/finance/transferSchema";

import CurrencyAdornment from "@/shared/components/CurrencyAdornment";

import { formatToBRL, maskCurrency } from "@/shared/utils/formatters/currency";

import { ButtonContainer, Form, Title } from "./styles";

import { formatCPF_CNPJ } from "@/shared/utils/formatters/documentsMask";

const steps = ["Transferência", "Confirmar os Dados", "Enviar"];

interface ITransferForm {
  open: boolean;
  handleClose: () => void;
  user: any;
  fetchData: () => void;
}

const TransferForm: React.FC<ITransferForm> = ({
  open,
  handleClose,
  user,
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
    resolver: yupResolver(getTransferStepSchema(activeStep, user)),
  });

  const amount = watch("amount", "0,00");

  const onAmountChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue("amount", maskCurrency(event.target.value));
  };

  const changeTaxNumberHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue("taxNumber", formatCPF_CNPJ(event));
  };

  const onSubmit = async (data: any) => {
    if (isLastStep) {
      setIsLoading(true);
      const response = await transferFinance({
        ...data,
        balance: user?.balance,
      });
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
                <Title>Qual é o valor da transferência?</Title>
                <p>Saldo disponível de {formatToBRL(user?.balance)}</p>
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
              <InputCustom
                name="taxNumber"
                control={control}
                label="CPF/CNPJ*"
                errors={errors}
                onChange={changeTaxNumberHandler}
              />
            </>
          )}

          {activeStep === 1 && (
            <div>
              <Title>Transferir</Title>
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

export default TransferForm;
